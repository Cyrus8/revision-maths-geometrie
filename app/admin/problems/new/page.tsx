import { prisma } from "@/lib/db";
import { ProblemEditor } from "@/components/admin/ProblemEditor";

export default async function NewProblemPage() {
  const chapters = await prisma.chapter.findMany({
    orderBy: [{ theme: { order: "asc" } }, { order: "asc" }],
    include: { theme: true },
  });

  return (
    <main className="container-wide py-8 sm:py-10">
      <h1 className="text-3xl font-semibold text-foreground">Nouveau problème</h1>
      <div className="mt-6">
        <ProblemEditor
          chapters={chapters.map((chapter) => ({
            id: chapter.id,
            label: `${chapter.theme.name} — ${chapter.name}`,
          }))}
        />
      </div>
    </main>
  );
}
