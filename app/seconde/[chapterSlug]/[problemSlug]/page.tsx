import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
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
  const currentPath = `/seconde/${chapterSlug}/${problemSlug}`;

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
        {studentId ? (
          <ProblemPlayer problem={problem} chapterSlug={chapterSlug} chapterName={chapter.name} />
        ) : (
          <Card className="p-8 text-center">
            <h1 className="text-xl font-semibold text-foreground">Connexion requise</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Connecte-toi pour commencer ce problème : ta note sera enregistrée et visible dans
              ton historique.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href={`/login?next=${encodeURIComponent(currentPath)}`}>
                <Button type="button">Se connecter</Button>
              </Link>
              <Link href="/register">
                <Button type="button" variant="secondary">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
