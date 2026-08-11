import type { SeedTheme } from "./types";

export const THEMES: SeedTheme[] = [
  {
    slug: "nombres-et-calculs-algebre",
    name: "Nombres et calculs, algèbre",
    description:
      "Approfondir les ensembles de nombres, le calcul numérique et littéral, et résoudre des problèmes avec équations et inéquations.",
    order: 0,
  },
  {
    slug: "geometrie",
    name: "Géométrie",
    description:
      "Consolider les configurations du collège, utiliser les vecteurs pour démontrer, et étudier les équations de droites.",
    order: 1,
  },
  {
    slug: "fonctions",
    name: "Fonctions",
    description:
      "Consolider la notion de fonction, étendre les fonctions de référence et étudier variations et extremums.",
    order: 2,
  },
  {
    slug: "statistiques-et-probabilites",
    name: "Statistiques et probabilités",
    description:
      "Approfondir la statistique descriptive, croiser des variables qualitatives et introduire les probabilités conditionnelles.",
    order: 3,
  },
];
