import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { toProblemDTO } from "@/lib/data";
import { ProblemEditor, type DraftProblem } from "@/components/admin/ProblemEditor";

export default async function EditProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [problemRow, chapters] = await Promise.all([
    prisma.problem.findUnique({ where: { id }, include: { questions: true } }),
    prisma.chapter.findMany({
      orderBy: [{ theme: { order: "asc" } }, { order: "asc" }],
      include: { theme: true },
    }),
  ]);

  if (!problemRow) notFound();

  const problem = toProblemDTO(problemRow);
  const initialProblem: DraftProblem = {
    chapterId: problem.chapterId,
    slug: problem.slug,
    title: problem.title,
    intro: problem.intro,
    difficulty: problem.difficulty,
    published: problem.published,
    showCalculator: problem.showCalculator,
    order: problem.order,
    questions: problem.questions.map((question) => ({
      key: question.id,
      type: question.type,
      statement: question.statement,
      points: question.points,
      difficulty: question.difficulty,
      data: question.data,
      hints: question.hints,
      solution: question.solution,
      explanation: question.explanation,
    })),
  };

  return (
    <main className="container-wide py-8 sm:py-10">
      <h1 className="text-3xl font-semibold text-foreground">Éditer : {problem.title}</h1>
      <div className="mt-6">
        <ProblemEditor
          chapters={chapters.map((chapter) => ({
            id: chapter.id,
            label: `${chapter.theme.name} — ${chapter.name}`,
          }))}
          problemId={id}
          initialProblem={initialProblem}
        />
      </div>
    </main>
  );
}
