import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getCurrentStudentId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function MyResultsPage() {
  const studentId = await getCurrentStudentId();
  if (!studentId) redirect("/login?next=/mes-resultats");

  const attempts = await prisma.attempt.findMany({
    where: { studentId },
    orderBy: { finishedAt: "desc" },
    include: { problem: { include: { chapter: true } } },
    take: 100,
  });

  const average =
    attempts.length > 0
      ? Math.round((attempts.reduce((sum, a) => sum + a.score20, 0) / attempts.length) * 10) / 10
      : null;

  return (
    <main className="container-wide py-8 sm:py-10">
      <h1 className="text-3xl font-semibold text-foreground">Mes résultats</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Historique de tes tentatives, dans l&apos;ordre le plus récent.
      </p>

      <Card className="mt-6 p-5">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted-foreground">Tentatives</p>
            <p className="text-2xl font-semibold text-foreground">{attempts.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Moyenne</p>
            <p className="text-2xl font-semibold text-foreground">
              {average !== null ? `${average} / 20` : "—"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-5 sm:p-6">
        {attempts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Tu n&apos;as pas encore fait de problème.{" "}
            <Link href="/seconde" className="font-medium text-accent">
              Commencer maintenant
            </Link>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Chapitre</th>
                  <th className="py-2 pr-4 font-medium">Problème</th>
                  <th className="py-2 font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 text-muted-foreground">
                      {attempt.finishedAt.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2 pr-4 text-foreground">{attempt.problem.chapter.name}</td>
                    <td className="py-2 pr-4">
                      <Link
                        href={`/seconde/${attempt.problem.chapter.slug}/${attempt.problem.slug}`}
                        className="text-accent hover:underline"
                      >
                        {attempt.problem.title}
                      </Link>
                    </td>
                    <td className="py-2">
                      <Badge tone={attempt.score20 >= 12 ? "success" : attempt.score20 >= 8 ? "warning" : "danger"}>
                        {attempt.score20} / 20
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
