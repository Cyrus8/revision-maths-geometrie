import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getClassWithThemes } from "@/lib/data";

export default async function SecondePage() {
  const classLevel = await getClassWithThemes("seconde");
  if (!classLevel) notFound();

  return (
    <main className="container-wide py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: classLevel.name }]} />

      <h1 className="mt-3 text-3xl font-semibold text-foreground">{classLevel.name}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Le programme est organisé en grands thèmes, chacun décomposé en chapitres. Chaque
        chapitre propose 3 problèmes complets, notés sur 20.
      </p>

      <div className="mt-8 space-y-10">
        {classLevel.themes.map((theme) => (
          <section key={theme.id}>
            <h2 className="text-lg font-semibold text-foreground">{theme.name}</h2>
            {theme.description && (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{theme.description}</p>
            )}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {theme.chapters.map((chapter) => (
                <Link key={chapter.id} href={`/seconde/${chapter.slug}`}>
                  <Card className="h-full p-5 transition-colors hover:border-accent">
                    <h3 className="text-base font-semibold text-foreground">{chapter.name}</h3>
                    {chapter.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{chapter.description}</p>
                    )}
                    <div className="mt-3">
                      <Badge tone="accent">{chapter._count.problems} problèmes</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
