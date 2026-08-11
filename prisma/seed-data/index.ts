import type { SeedChapter } from "./types";
import { THEMES } from "./themes";
import { arithmetiqueProblems } from "./arithmetique";
import { nombresReelsProblems } from "./nombres-reels";
import { algebreProblems } from "./algebre";
import { vecteursProblems } from "./vecteurs";
import { droitesProblems } from "./droites";
import { fonctionsRepresentationProblems } from "./fonctions-representation";
import { fonctionsVariationsProblems } from "./fonctions-variations";
import { statistiquesProblems } from "./statistiques";
import { croisementVariablesProblems } from "./croisement-variables";
import { probabilitesProblems } from "./probabilites";

export { THEMES };

export const CHAPTERS: SeedChapter[] = [
  {
    themeSlug: "nombres-et-calculs-algebre",
    slug: "arithmetique",
    name: "Arithmétique",
    description: "Multiples, diviseurs, nombres pairs et impairs, fractions irréductibles.",
    order: 0,
    problems: arithmetiqueProblems,
  },
  {
    themeSlug: "nombres-et-calculs-algebre",
    slug: "nombres-reels",
    name: "Nombres réels",
    description: "Droite numérique, intervalles, valeur absolue et encadrements.",
    order: 1,
    problems: nombresReelsProblems,
  },
  {
    themeSlug: "nombres-et-calculs-algebre",
    slug: "algebre",
    name: "Algèbre : équations et inéquations",
    description: "Puissances, racines carrées, identités remarquables, équations et inéquations du premier degré.",
    order: 2,
    problems: algebreProblems,
  },
  {
    themeSlug: "geometrie",
    slug: "vecteurs-et-problemes-de-geometrie",
    name: "Vecteurs et problèmes de géométrie",
    description: "Opérations sur les vecteurs, colinéarité, alignement et parallélisme.",
    order: 0,
    problems: vecteursProblems,
  },
  {
    themeSlug: "geometrie",
    slug: "droites-du-plan",
    name: "Droites du plan",
    description: "Vecteur directeur, équations cartésienne et réduite, positions relatives de deux droites.",
    order: 1,
    problems: droitesProblems,
  },
  {
    themeSlug: "fonctions",
    slug: "representation-des-fonctions",
    name: "Représentation algébrique et graphique des fonctions",
    description: "Courbe représentative, fonctions de référence, résolution graphique et algébrique.",
    order: 0,
    problems: fonctionsRepresentationProblems,
  },
  {
    themeSlug: "fonctions",
    slug: "variations-et-extremums",
    name: "Variations et extremums d'une fonction",
    description: "Tableaux de variations, extremums, problèmes d'optimisation.",
    order: 1,
    problems: fonctionsVariationsProblems,
  },
  {
    themeSlug: "statistiques-et-probabilites",
    slug: "information-chiffree-et-statistique-descriptive",
    name: "Information chiffrée et statistique descriptive",
    description: "Proportions, évolutions, moyenne, médiane, écart type, séries regroupées en classes.",
    order: 0,
    problems: statistiquesProblems,
  },
  {
    themeSlug: "statistiques-et-probabilites",
    slug: "croisement-de-deux-variables-qualitatives",
    name: "Croisement de deux variables qualitatives",
    description: "Tableaux croisés d'effectifs, fréquences conditionnelles et marginales.",
    order: 1,
    problems: croisementVariablesProblems,
  },
  {
    themeSlug: "statistiques-et-probabilites",
    slug: "probabilites",
    name: "Probabilités",
    description: "Probabilité conditionnelle, arbres pondérés, loi des grands nombres.",
    order: 2,
    problems: probabilitesProblems,
  },
];
