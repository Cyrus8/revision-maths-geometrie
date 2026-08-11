import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProblemPlayer } from "@/components/ProblemPlayer";
import { getCurrentStudentId } from "@/lib/auth";
import { getProblemForPlayer } from "@/lib/data";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ chapterSlug: string; problemSlug: string }>;
}) {
  const { chapterSlug, problemSlug } = await params;
  const result = await getProblemForPlayer("seconde", chapterSlug, problemSlug);
  if (!result) notFound();
  const { problem, chapter, theme } = result;

  const studentId = await getCurrentStudentId();

  return (
    <main className="container-wide py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Seconde", href: "/seconde" },
          { label: theme.name },
          { label: chapter.name, href: `/seconde/${chapterSlug}` },
          { label: problem.title },
        ]}
      />

      <div className="mt-4">
        <ProblemPlayer
          problem={problem}
          chapterSlug={chapterSlug}
          chapterName={chapter.name}
          guestMode={!studentId}
        />
      </div>
    </main>
  );
}
