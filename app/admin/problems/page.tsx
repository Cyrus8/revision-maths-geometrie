import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { prisma } from "@/lib/db";
import { AdminProblemsTable } from "./AdminProblemsTable";

export default async function AdminProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: [{ chapter: { theme: { order: "asc" } } }, { chapter: { order: "asc" } }, { order: "asc" }],
    include: {
      chapter: { include: { theme: true } },
      _count: { select: { questions: true, attempts: true } },
    },
  });

  return (
    <main className="container-wide py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Problèmes</h1>
          <p className="mt-2 text-sm text-muted-foreground">{problems.length} problème(s).</p>
        </div>
        <Link href="/admin/problems/new">
          <Button type="button">Nouveau problème</Button>
        </Link>
      </div>

      <Card className="mt-6 p-5 sm:p-6">
        <AdminProblemsTable
          problems={problems.map((problem) => ({
            id: problem.id,
            title: problem.title,
            slug: problem.slug,
            published: problem.published,
            chapterName: problem.chapter.name,
            themeName: problem.chapter.theme.name,
            questionCount: problem._count.questions,
            attemptCount: problem._count.attempts,
          }))}
        />
      </Card>
    </main>
  );
}
