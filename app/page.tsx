import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getClassLevels } from "@/lib/data";

const UPCOMING_CLASSES = ["Première", "Terminale"];

export default async function HomePage() {
  const classLevels = await getClassLevels();

  return (
    <main className="container-wide py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent">Catalogue de problèmes de maths</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
          Choisis ta classe
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Des problèmes complets, comme des mini-examens, classés par chapitre. Chaque problème
          progresse en difficulté et se note automatiquement sur 20.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classLevels.map((classLevel) => (
          <Link key={classLevel.id} href={`/${classLevel.slug}`}>
            <Card className="h-full p-6 transition-colors hover:border-accent">
              <Badge tone="accent">Disponible</Badge>
              <h2 className="mt-3 text-xl font-semibold text-foreground">{classLevel.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Voir les chapitres et les problèmes.
              </p>
            </Card>
          </Link>
        ))}

        {UPCOMING_CLASSES.map((name) => (
          <Card key={name} className="h-full p-6 opacity-60">
            <Badge>Bientôt disponible</Badge>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Cette classe n&apos;est pas encore ouverte.
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
