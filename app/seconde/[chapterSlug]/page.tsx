import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DIFFICULTY_LABELS } from "@/lib/types";
import { getChapterWithProblems } from "@/lib/data";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = await getChapterWithProblems("seconde", chapterSlug);
  if (!chapter) notFound();

  return (
    <main className="container-wide py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Seconde", href: "/seconde" },
          { label: chapter.theme.name },
          { label: chapter.name },
        ]}
      />

      <h1 className="mt-3 text-3xl font-semibold text-foreground">{chapter.name}</h1>
      {chapter.description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {chapter.description}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapter.problems.map((problem) => (
          <Card key={problem.id} className="flex h-full flex-col p-5">
            <Badge tone="accent">{DIFFICULTY_LABELS[problem.difficulty] ?? "Moyen"}</Badge>
            <h2 className="mt-3 text-base font-semibold text-foreground">{problem.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {problem.intro.slice(0, 140)}
              {problem.intro.length > 140 ? "…" : ""}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {problem._count.questions} questions
            </p>
            <Link href={`/seconde/${chapter.slug}/${problem.slug}`} className="mt-4">
              <span className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
                Commencer
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
