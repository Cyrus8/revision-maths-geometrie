import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Hint, ProblemDTO, QuestionData } from "@/lib/types";

type ProblemWithQuestions = Prisma.ProblemGetPayload<{ include: { questions: true } }>;

export function toProblemDTO(problem: ProblemWithQuestions): ProblemDTO {
  return {
    id: problem.id,
    slug: problem.slug,
    title: problem.title,
    intro: problem.intro,
    difficulty: problem.difficulty,
    published: problem.published,
    showCalculator: problem.showCalculator,
    order: problem.order,
    chapterId: problem.chapterId,
    questions: problem.questions
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((question) => ({
        id: question.id,
        order: question.order,
        type: question.type,
        statement: question.statement,
        points: question.points,
        difficulty: question.difficulty,
        data: question.data as QuestionData,
        hints: question.hints as Hint[],
        solution: question.solution,
        explanation: question.explanation,
      })),
  };
}

export async function getClassLevels() {
  return prisma.classLevel.findMany({ orderBy: { order: "asc" } });
}

export async function getClassWithThemes(classSlug: string) {
  return prisma.classLevel.findUnique({
    where: { slug: classSlug },
    include: {
      themes: {
        orderBy: { order: "asc" },
        include: {
          chapters: {
            orderBy: { order: "asc" },
            include: {
              _count: { select: { problems: { where: { published: true } } } },
            },
          },
        },
      },
    },
  });
}

export async function getChapterWithProblems(classSlug: string, chapterSlug: string) {
  return prisma.chapter.findFirst({
    where: { slug: chapterSlug, theme: { classLevel: { slug: classSlug } } },
    include: {
      theme: { include: { classLevel: true } },
      problems: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: { _count: { select: { questions: true } } },
      },
    },
  });
}

export async function getProblemForPlayer(
  classSlug: string,
  chapterSlug: string,
  problemSlug: string
) {
  const problem = await prisma.problem.findFirst({
    where: {
      slug: problemSlug,
      published: true,
      chapter: { slug: chapterSlug, theme: { classLevel: { slug: classSlug } } },
    },
    include: {
      questions: true,
      chapter: { include: { theme: true } },
    },
  });
  if (!problem) return null;
  return { problem: toProblemDTO(problem), chapter: problem.chapter, theme: problem.chapter.theme };
}
