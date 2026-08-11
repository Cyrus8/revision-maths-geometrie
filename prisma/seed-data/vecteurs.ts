import type { SeedProblem } from "./types";

export const vecteursProblems: SeedProblem[] = [
  {
    slug: "coordonnees-de-vecteurs-et-milieu",
    title: "Coordonnées de vecteurs et milieu d'un segment",
    difficulty: 2,
    intro:
      "Dans le plan muni d'un repère orthonormé, on considère les points A(1 ; 2), B(4 ; 6) et C(9 ; 2).",
    questions: [
      {
        type: "QCM",
        statement: "Quelles sont les coordonnées du vecteur AB (le vecteur allant de A à B) ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["(3 ; 4)", "(5 ; 8)", "(3 ; 6)", "(4 ; 3)"],
          correctIndex: 0,
        },
        hints: [
          { text: "Les coordonnées du vecteur AB sont (xB − xA ; yB − yA).", malus: 1 },
          { text: "Calcule 4 − 1 pour l'abscisse, puis 6 − 2 pour l'ordonnée.", malus: 1 },
        ],
        solution: "(3 ; 4)",
        explanation: "Vecteur AB = (xB − xA ; yB − yA) = (4 − 1 ; 6 − 2) = (3 ; 4).",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la norme du vecteur AB, c'est-à-dire la longueur AB ?",
        points: 2,
        difficulty: 1,
        data: { value: 5, tolerance: 0.001 },
        hints: [
          { text: "La norme d'un vecteur (x ; y) est √(x² + y²).", malus: 1 },
          { text: "Calcule √(3² + 4²).", malus: 1 },
        ],
        solution: "5",
        explanation: "AB = √(3² + 4²) = √(9 + 16) = √25 = 5.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'abscisse (coordonnée x) du milieu I du segment [AB] ?",
        points: 3,
        difficulty: 2,
        data: { value: 2.5, tolerance: 0.001 },
        hints: [
          { text: "L'abscisse du milieu de [AB] est (xA + xB) / 2.", malus: 1 },
          { text: "Calcule (1 + 4) / 2.", malus: 1 },
        ],
        solution: "2,5",
        explanation: "xI = (xA + xB) / 2 = (1 + 4) / 2 = 2,5.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée (coordonnée y) du milieu I du segment [AB] ?",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0.001 },
        hints: [
          { text: "L'ordonnée du milieu de [AB] est (yA + yB) / 2.", malus: 1 },
          { text: "Calcule (2 + 6) / 2.", malus: 1 },
        ],
        solution: "4",
        explanation: "yI = (yA + yB) / 2 = (2 + 6) / 2 = 4.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule la distance AC entre les points A(1 ; 2) et C(9 ; 2).",
        points: 4,
        difficulty: 3,
        data: { value: 8, tolerance: 0.001 },
        hints: [
          { text: "Calcule d'abord les coordonnées du vecteur AC : (xC − xA ; yC − yA).", malus: 1 },
          { text: "A et C ont la même ordonnée : le vecteur AC est horizontal, sa norme est simplement |xC − xA|.", malus: 1 },
        ],
        solution: "8",
        explanation: "Vecteur AC = (9 − 1 ; 2 − 2) = (8 ; 0). Sa norme est √(8² + 0²) = 8.",
      },
      {
        type: "NUMERIC",
        statement:
          "Le vecteur AB a pour coordonnées (3 ; 4) et le vecteur AC a pour coordonnées (8 ; 0). Quelle est l'abscisse du vecteur somme AB + AC ?",
        points: 4,
        difficulty: 3,
        data: { value: 11, tolerance: 0.001 },
        hints: [
          { text: "Les coordonnées d'une somme de vecteurs s'additionnent coordonnée par coordonnée.", malus: 1 },
          { text: "Additionne les deux abscisses : 3 + 8.", malus: 1 },
        ],
        solution: "11",
        explanation: "AB + AC = (3 + 8 ; 4 + 0) = (11 ; 4). L'abscisse du vecteur somme est 11.",
      },
    ],
  },
  {
    slug: "colinearite-et-alignement",
    title: "Colinéarité, alignement et parallélisme",
    difficulty: 2,
    intro:
      "Dans le plan muni d'un repère orthonormé, on considère les points E(0 ; 1), F(3 ; 3) et G(6 ; 5). On cherche à savoir si les points E, F et G sont alignés.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quelle est l'abscisse du vecteur EF ?",
        points: 2,
        difficulty: 1,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "L'abscisse du vecteur EF est xF − xE.", malus: 1 },
          { text: "Calcule 3 − 0.", malus: 1 },
        ],
        solution: "3",
        explanation: "xF − xE = 3 − 0 = 3.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée du vecteur EF ?",
        points: 2,
        difficulty: 1,
        data: { value: 2, tolerance: 0 },
        hints: [
          { text: "L'ordonnée du vecteur EF est yF − yE.", malus: 1 },
          { text: "Calcule 3 − 1.", malus: 1 },
        ],
        solution: "2",
        explanation: "yF − yE = 3 − 1 = 2.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'abscisse du vecteur EG ?",
        points: 3,
        difficulty: 2,
        data: { value: 6, tolerance: 0 },
        hints: [
          { text: "L'abscisse du vecteur EG est xG − xE.", malus: 1 },
          { text: "Calcule 6 − 0.", malus: 1 },
        ],
        solution: "6",
        explanation: "xG − xE = 6 − 0 = 6.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée du vecteur EG ?",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0 },
        hints: [
          { text: "L'ordonnée du vecteur EG est yG − yE.", malus: 1 },
          { text: "Calcule 5 − 1.", malus: 1 },
        ],
        solution: "4",
        explanation: "yG − yE = 5 − 1 = 4.",
      },
      {
        type: "NUMERIC",
        statement:
          "Le vecteur EF a pour coordonnées (3 ; 2) et le vecteur EG a pour coordonnées (6 ; 4). Calcule leur déterminant, égal à 3 × 4 − 2 × 6.",
        points: 4,
        difficulty: 3,
        data: { value: 0, tolerance: 0 },
        hints: [
          { text: "Le déterminant de deux vecteurs (x ; y) et (x' ; y') est x × y' − y × x'.", malus: 1 },
          { text: "Calcule 3 × 4, puis 2 × 6, puis fais la différence.", malus: 1 },
        ],
        solution: "0",
        explanation: "3 × 4 − 2 × 6 = 12 − 12 = 0.",
      },
      {
        type: "QCM",
        statement: "Que peut-on en conclure sur les points E, F et G ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Ils sont alignés, car le déterminant des vecteurs EF et EG est nul",
            "Ils forment un triangle, car le déterminant est nul",
            "Ils ne sont pas alignés, car le déterminant est nul",
            "On ne peut rien conclure à partir de ce résultat",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Deux vecteurs sont colinéaires si, et seulement si, leur déterminant est nul.", malus: 1 },
          { text: "Si les vecteurs EF et EG sont colinéaires et partagent le point E, que peut-on dire des points E, F, G ?", malus: 1 },
        ],
        solution: "Ils sont alignés, car le déterminant des vecteurs EF et EG est nul",
        explanation:
          "Le déterminant des vecteurs EF et EG est nul, donc ces deux vecteurs sont colinéaires. Comme ils partagent le point E, les points E, F et G sont alignés.",
      },
    ],
  },
  {
    slug: "combinaison-de-vecteurs-et-chasles",
    title: "Combinaison de vecteurs et relation de Chasles",
    difficulty: 3,
    intro:
      "Dans le plan muni d'un repère orthonormé, on considère les points A(2 ; 1) et B(5 ; 3). On définit le point D par la relation vectorielle AD = 2 × AB.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quelle est l'abscisse du vecteur AB ?",
        points: 2,
        difficulty: 1,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "L'abscisse du vecteur AB est xB − xA.", malus: 1 },
          { text: "Calcule 5 − 2.", malus: 1 },
        ],
        solution: "3",
        explanation: "xB − xA = 5 − 2 = 3.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée du vecteur AB ?",
        points: 2,
        difficulty: 1,
        data: { value: 2, tolerance: 0 },
        hints: [
          { text: "L'ordonnée du vecteur AB est yB − yA.", malus: 1 },
          { text: "Calcule 3 − 1.", malus: 1 },
        ],
        solution: "2",
        explanation: "yB − yA = 3 − 1 = 2.",
      },
      {
        type: "NUMERIC",
        statement: "Le vecteur AD est tel que AD = 2 × AB. Quelle est l'abscisse du vecteur AD ?",
        points: 3,
        difficulty: 2,
        data: { value: 6, tolerance: 0 },
        hints: [
          { text: "Multiplier un vecteur par un réel k multiplie chacune de ses coordonnées par k.", malus: 1 },
          { text: "Calcule 2 × 3 (2 fois l'abscisse du vecteur AB).", malus: 1 },
        ],
        solution: "6",
        explanation: "Le vecteur AB a pour abscisse 3, donc le vecteur AD = 2 × AB a pour abscisse 2 × 3 = 6.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée du vecteur AD ?",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0 },
        hints: [
          { text: "Multiplier un vecteur par un réel k multiplie chacune de ses coordonnées par k.", malus: 1 },
          { text: "Calcule 2 × 2 (2 fois l'ordonnée du vecteur AB).", malus: 1 },
        ],
        solution: "4",
        explanation: "Le vecteur AB a pour ordonnée 2, donc le vecteur AD = 2 × AB a pour ordonnée 2 × 2 = 4.",
      },
      {
        type: "NUMERIC",
        statement:
          "Le vecteur AD a pour coordonnées (6 ; 4). Pour retrouver les coordonnées de D, on ajoute celles du vecteur AD à celles de A. Quelle est l'abscisse du point D ?",
        points: 4,
        difficulty: 3,
        data: { value: 8, tolerance: 0 },
        hints: [
          { text: "Si AD a pour coordonnées (x ; y), alors D = (xA + x ; yA + y).", malus: 1 },
          { text: "Calcule 2 + 6.", malus: 1 },
        ],
        solution: "8",
        explanation: "xD = xA + 6 = 2 + 6 = 8.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée du point D ?",
        points: 4,
        difficulty: 3,
        data: { value: 5, tolerance: 0 },
        hints: [
          { text: "Utilise la même méthode que pour l'abscisse, avec les ordonnées.", malus: 1 },
          { text: "Calcule 1 + 4.", malus: 1 },
        ],
        solution: "5",
        explanation: "yD = yA + 4 = 1 + 4 = 5. Le point D a donc pour coordonnées (8 ; 5).",
      },
    ],
  },
];
