import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { problemInputSchema } from "@/lib/validation";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = problemInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }

  const data = parsed.data;

  try {
    await prisma.problem.update({
      where: { id },
      data: {
        chapterId: data.chapterId,
        slug: data.slug,
        title: data.title,
        intro: data.intro,
        difficulty: data.difficulty,
        published: data.published,
        showCalculator: data.showCalculator,
        order: data.order,
        questions: {
          deleteMany: {},
          create: data.questions.map((question, index) => ({
            order: index,
            type: question.type,
            statement: question.statement,
            points: question.points,
            difficulty: question.difficulty,
            data: question.data,
            hints: question.hints,
            solution: question.solution,
            explanation: question.explanation,
          })),
        },
      },
    });
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Un problème avec ce slug existe déjà dans ce chapitre." },
        { status: 409 }
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Problème introuvable." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.problem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Problème introuvable." }, { status: 404 });
    }
    throw error;
  }
}
