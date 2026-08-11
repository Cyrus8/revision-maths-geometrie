import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/db";

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      attempts: {
        orderBy: { finishedAt: "asc" },
        include: { problem: { include: { chapter: true } } },
      },
    },
  });
  if (!student) notFound();

  const byProblem = new Map<string, { title: string; chapterName: string; chapterSlug: string; problemSlug: string; attempts: typeof student.attempts }>();
  for (const attempt of student.attempts) {
    const key = attempt.problemId;
    const entry = byProblem.get(key);
    if (entry) {
      entry.attempts.push(attempt);
    } else {
      byProblem.set(key, {
        title: attempt.problem.title,
        chapterName: attempt.problem.chapter.name,
        chapterSlug: attempt.problem.chapter.slug,
        problemSlug: attempt.problem.slug,
        attempts: [attempt],
      });
    }
  }

  const average =
    student.attempts.length > 0
      ? Math.round(
          (student.attempts.reduce((sum, a) => sum + a.score20, 0) / student.attempts.length) * 10
        ) / 10
      : null;

  return (
    <main className="container-wide py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Élèves & résultats", href: "/admin/students" },
          { label: student.name },
        ]}
      />

      <h1 className="mt-3 text-3xl font-semibold text-foreground">{student.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{student.email}</p>

      <Card className="mt-6 p-5">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted-foreground">Tentatives</p>
            <p className="text-2xl font-semibold text-foreground">{student.attempts.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Moyenne générale</p>
            <p className="text-2xl font-semibold text-foreground">
              {average !== null ? `${average} / 20` : "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Compte créé le</p>
            <p className="text-2xl font-semibold text-foreground">
              {student.createdAt.toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
      </Card>

      <h2 className="mt-8 text-lg font-semibold text-foreground">Progression par problème</h2>
      <div className="mt-4 space-y-4">
        {byProblem.size === 0 && (
          <p className="text-sm text-muted-foreground">Aucune tentative pour le moment.</p>
        )}
        {Array.from(byProblem.values()).map((entry) => {
          const first = entry.attempts[0].score20;
          const last = entry.attempts[entry.attempts.length - 1].score20;
          const delta = Math.round((last - first) * 10) / 10;
          return (
            <Card key={entry.title} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {entry.chapterName}
                  </p>
                  <Link
                    href={`/seconde/${entry.chapterSlug}/${entry.problemSlug}`}
                    className="font-semibold text-foreground hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </div>
                {entry.attempts.length > 1 && (
                  <Badge tone={delta > 0 ? "success" : delta < 0 ? "danger" : "neutral"}>
                    {delta > 0 ? "+" : ""}
                    {delta} pts depuis la 1ère tentative
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.attempts.map((attempt, i) => (
                  <span
                    key={attempt.id}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground"
                    title={attempt.finishedAt.toLocaleString("fr-FR")}
                  >
                    #{i + 1} · {attempt.score20}/20 · {attempt.finishedAt.toLocaleDateString("fr-FR")}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-8 text-lg font-semibold text-foreground">Historique complet</h2>
      <Card className="mt-4 p-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Problème</th>
                <th className="py-2 pr-4 font-medium">Note</th>
                <th className="py-2 font-medium">Points</th>
              </tr>
            </thead>
            <tbody>
              {[...student.attempts].reverse().map((attempt) => (
                <tr key={attempt.id} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 text-muted-foreground">
                    {attempt.finishedAt.toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 pr-4 text-foreground">{attempt.problem.title}</td>
                  <td className="py-2 pr-4">
                    <Badge tone={attempt.score20 >= 12 ? "success" : attempt.score20 >= 8 ? "warning" : "danger"}>
                      {attempt.score20} / 20
                    </Badge>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {attempt.earnedPoints} / {attempt.maxPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
