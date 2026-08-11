import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { prisma } from "@/lib/db";

export default async function AdminStudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: { name: "asc" },
    include: {
      attempts: { select: { score20: true, finishedAt: true } },
    },
  });

  return (
    <main className="container-wide py-8 sm:py-10">
      <h1 className="text-3xl font-semibold text-foreground">Élèves &amp; résultats</h1>
      <p className="mt-2 text-sm text-muted-foreground">{students.length} élève(s) inscrit(s).</p>

      <Card className="mt-6 p-5 sm:p-6">
        {students.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun élève inscrit pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Nom</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Tentatives</th>
                  <th className="py-2 pr-4 font-medium">Moyenne</th>
                  <th className="py-2 font-medium">Dernière activité</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const count = student.attempts.length;
                  const average =
                    count > 0
                      ? Math.round(
                          (student.attempts.reduce((sum, a) => sum + a.score20, 0) / count) * 10
                        ) / 10
                      : null;
                  const last = student.attempts.reduce<Date | null>((latest, a) => {
                    return !latest || a.finishedAt > latest ? a.finishedAt : latest;
                  }, null);

                  return (
                    <tr key={student.id} className="border-b border-border last:border-0">
                      <td className="py-2 pr-4">
                        <Link href={`/admin/students/${student.id}`} className="font-medium text-accent hover:underline">
                          {student.name}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">{student.email}</td>
                      <td className="py-2 pr-4 text-foreground">{count}</td>
                      <td className="py-2 pr-4">
                        {average !== null ? (
                          <Badge tone={average >= 12 ? "success" : average >= 8 ? "warning" : "danger"}>
                            {average} / 20
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {last
                          ? last.toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
