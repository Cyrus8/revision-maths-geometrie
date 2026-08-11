import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentStudentId } from "@/lib/auth";
import { toProblemDTO } from "@/lib/data";
import { WRONG_ATTEMPT_MALUS, isAnswerCorrect, maxPoints, scoreOn20 } from "@/lib/grading";

const responseSchema = z.object({
  questionId: z.string(),
  rawAnswer: z.string(),
  skipped: z.boolean(),
  hintsUsed: z.number().int().min(0),
  wrongAttempts: z.number().int().min(0),
});

const submitAttemptSchema = z.object({
  problemId: z.string(),
  startedAt: z.string(),
  responses: z.array(responseSchema),
});

export async function POST(request: NextRequest) {
  const studentId = await getCurrentStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Connexion élève requise." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = submitAttemptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { problemId, startedAt, responses } = parsed.data;

  const problemRow = await prisma.problem.findUnique({
    where: { id: problemId },
    include: { questions: true },
  });
  if (!problemRow || !problemRow.published) {
    return NextResponse.json({ error: "Problème introuvable." }, { status: 404 });
  }

  const problem = toProblemDTO(problemRow);
  const responseByQuestionId = new Map(responses.map((response) => [response.questionId, response]));

  const graded = problem.questions.map((question) => {
    const response = responseByQuestionId.get(question.id);

    const hintsUsed = Math.min(response?.hintsUsed ?? 0, question.hints.length);
    const wrongAttempts = response?.wrongAttempts ?? 0;

    if (!response || response.skipped) {
      return { questionId: question.id, status: "SKIPPED" as const, hintsUsed, wrongAttempts, pointsEarned: 0 };
    }

    const correct = isAnswerCorrect(question, response.rawAnswer);
    if (!correct) {
      return { questionId: question.id, status: "INCORRECT" as const, hintsUsed, wrongAttempts, pointsEarned: 0 };
    }

    const hintMalus = question.hints.slice(0, hintsUsed).reduce((sum, hint) => sum + hint.malus, 0);
    const wrongMalus = wrongAttempts * WRONG_ATTEMPT_MALUS;
    return {
      questionId: question.id,
      status: "CORRECT" as const,
      hintsUsed,
      wrongAttempts,
      pointsEarned: Math.max(0, question.points - hintMalus - wrongMalus),
    };
  });

  const earnedPoints = graded.reduce((sum, item) => sum + item.pointsEarned, 0);
  const totalPoints = maxPoints(problem.questions);
  const score20 = scoreOn20(earnedPoints, totalPoints);

  const attempt = await prisma.attempt.create({
    data: {
      studentId,
      problemId,
      earnedPoints,
      maxPoints: totalPoints,
      score20,
      startedAt: new Date(startedAt),
      answers: { create: graded },
    },
  });

  return NextResponse.json({
    attempt: {
      id: attempt.id,
      earnedPoints,
      maxPoints: totalPoints,
      score20,
      finishedAt: attempt.finishedAt,
    },
    breakdown: graded,
  });
}
