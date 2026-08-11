import type { SeedProblem } from "./types";

export const droitesProblems: SeedProblem[] = [
  {
    slug: "equation-reduite-d-une-droite",
    title: "Déterminer l'équation réduite d'une droite",
    difficulty: 2,
    intro: "Dans un repère orthonormé, la droite (d) passe par les points P(1 ; 3) et Q(4 ; 9).",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quel est le coefficient directeur (la pente) de la droite (d) ?",
        points: 2,
        difficulty: 1,
        data: { value: 2, tolerance: 0.001 },
        hints: [
          { text: "Le coefficient directeur est (yQ − yP) / (xQ − xP).", malus: 1 },
          { text: "Calcule (9 − 3) / (4 − 1).", malus: 1 },
        ],
        solution: "2",
        explanation: "m = (9 − 3) / (4 − 1) = 6 / 3 = 2.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée à l'origine p de la droite (d), d'équation y = 2x + p ?",
        points: 2,
        difficulty: 1,
        data: { value: 1, tolerance: 0.001 },
        hints: [
          { text: "Remplace x et y par les coordonnées d'un point connu de la droite, par exemple P(1 ; 3).", malus: 1 },
          { text: "3 = 2 × 1 + p. Résous cette équation.", malus: 1 },
        ],
        solution: "1",
        explanation: "Avec P(1 ; 3) : 3 = 2 × 1 + p, donc 3 = 2 + p, d'où p = 1.",
      },
      {
        type: "QCM",
        statement: "Quelle est l'équation réduite de la droite (d) ?",
        points: 3,
        difficulty: 2,
        data: {
          options: ["y = 2x + 1", "y = 2x + 3", "y = x + 2", "y = 3x + 1"],
          correctIndex: 0,
        },
        hints: [
          { text: "L'équation réduite s'écrit y = mx + p.", malus: 1 },
          { text: "Tu as trouvé m = 2 et p = 1.", malus: 1 },
        ],
        solution: "y = 2x + 1",
        explanation: "Avec m = 2 et p = 1, l'équation réduite de (d) est y = 2x + 1.",
      },
      {
        type: "QCM",
        statement: "Le point R(10 ; 21) appartient-il à la droite (d) ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Oui, car 2 × 10 + 1 = 21",
            "Non, car 2 × 10 + 1 ≠ 21",
            "Oui, car R a une abscisse positive",
            "On ne peut pas savoir",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un point (x ; y) appartient à (d) si ses coordonnées vérifient y = 2x + 1.", malus: 1 },
          { text: "Remplace x par 10 dans 2x + 1 et compare le résultat à 21.", malus: 1 },
        ],
        solution: "Oui, car 2 × 10 + 1 = 21",
        explanation: "2 × 10 + 1 = 21, ce qui correspond bien à l'ordonnée de R : le point R appartient à (d).",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle valeur de x un point de (d) a-t-il pour ordonnée y = 15 ?",
        points: 4,
        difficulty: 3,
        data: { value: 7, tolerance: 0.001 },
        hints: [
          { text: "Résous l'équation 2x + 1 = 15.", malus: 1 },
          { text: "Isole x : 2x = 15 − 1, puis divise par 2.", malus: 1 },
        ],
        solution: "7",
        explanation: "2x + 1 = 15 équivaut à 2x = 14, donc x = 7.",
      },
      {
        type: "NUMERIC",
        statement: "La droite (d) coupe l'axe des abscisses en un point d'abscisse x. Quelle est cette valeur de x ?",
        points: 4,
        difficulty: 3,
        data: { value: -0.5, tolerance: 0.001 },
        hints: [
          { text: "Sur l'axe des abscisses, l'ordonnée y vaut 0.", malus: 1 },
          { text: "Résous l'équation 2x + 1 = 0.", malus: 1 },
        ],
        solution: "−0,5",
        explanation: "2x + 1 = 0 équivaut à 2x = −1, donc x = −0,5.",
      },
    ],
  },
  {
    slug: "droites-paralleles-ou-secantes",
    title: "Droites parallèles ou sécantes",
    difficulty: 2,
    intro:
      "On considère les droites (d1) : y = 3x − 2, (d2) : y = 3x + 5 et (d3) : y = −2x + 1.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quel est le coefficient directeur de (d1) ?",
        points: 2,
        difficulty: 1,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "Dans une équation y = mx + p, le coefficient directeur est m.", malus: 1 },
          { text: "Identifie m dans y = 3x − 2.", malus: 1 },
        ],
        solution: "3",
        explanation: "Dans y = 3x − 2, le coefficient directeur est 3.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le coefficient directeur de (d2) ?",
        points: 2,
        difficulty: 1,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "Dans une équation y = mx + p, le coefficient directeur est m.", malus: 1 },
          { text: "Identifie m dans y = 3x + 5.", malus: 1 },
        ],
        solution: "3",
        explanation: "Dans y = 3x + 5, le coefficient directeur est 3.",
      },
      {
        type: "QCM",
        statement: "Que peut-on dire des droites (d1) et (d2) ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Elles sont parallèles, car elles ont le même coefficient directeur",
            "Elles sont perpendiculaires",
            "Elles sont sécantes en un point",
            "Elles sont confondues",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Deux droites sont parallèles si, et seulement si, elles ont le même coefficient directeur.", malus: 1 },
          { text: "(d1) et (d2) ont-elles la même ordonnée à l'origine ? Sont-elles pour autant confondues ?", malus: 1 },
        ],
        solution: "Elles sont parallèles, car elles ont le même coefficient directeur",
        explanation:
          "(d1) et (d2) ont le même coefficient directeur (3) mais des ordonnées à l'origine différentes (−2 et 5) : elles sont parallèles et distinctes (non confondues).",
      },
      {
        type: "QCM",
        statement: "Que peut-on dire des droites (d1) et (d3) ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Elles sont sécantes, car leurs coefficients directeurs sont différents",
            "Elles sont parallèles",
            "Elles sont confondues",
            "On ne peut pas savoir",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare les coefficients directeurs de (d1) et (d3).", malus: 1 },
          { text: "Si deux droites non parallèles à l'axe des ordonnées ont des coefficients directeurs différents, elles se coupent en un unique point.", malus: 1 },
        ],
        solution: "Elles sont sécantes, car leurs coefficients directeurs sont différents",
        explanation: "(d1) a pour coefficient directeur 3 et (d3) a pour coefficient directeur −2 : ces droites sont sécantes.",
      },
      {
        type: "NUMERIC",
        statement:
          "Détermine l'abscisse du point d'intersection de (d1) et (d3), en résolvant 3x − 2 = −2x + 1.",
        points: 4,
        difficulty: 3,
        data: { value: 0.6, tolerance: 0.001 },
        hints: [
          { text: "Regroupe les termes en x d'un côté de l'égalité.", malus: 1 },
          { text: "3x − 2 = −2x + 1 équivaut à 5x = 3.", malus: 1 },
        ],
        solution: "0,6",
        explanation: "3x − 2 = −2x + 1 équivaut à 3x + 2x = 1 + 2, soit 5x = 3, donc x = 0,6.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée de ce point d'intersection ?",
        points: 4,
        difficulty: 3,
        data: { value: -0.2, tolerance: 0.001 },
        hints: [
          { text: "Remplace x par 0,6 dans l'équation de (d1) ou de (d3).", malus: 1 },
          { text: "Calcule 3 × 0,6 − 2.", malus: 1 },
        ],
        solution: "−0,2",
        explanation:
          "Avec (d1) : y = 3 × 0,6 − 2 = 1,8 − 2 = −0,2. On retrouve le même résultat avec (d3) : y = −2 × 0,6 + 1 = −0,2.",
      },
    ],
  },
  {
    slug: "vecteur-directeur-et-equation-cartesienne",
    title: "Vecteur directeur et équation cartésienne",
    difficulty: 3,
    intro:
      "La droite (Δ) passe par le point A(1 ; 2) et admet pour vecteur directeur u, de coordonnées (3 ; 1). On teste si le point B(7 ; 4) appartient à (Δ).",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule l'abscisse du vecteur AB.",
        points: 2,
        difficulty: 1,
        data: { value: 6, tolerance: 0 },
        hints: [
          { text: "L'abscisse du vecteur AB est xB − xA.", malus: 1 },
          { text: "Calcule 7 − 1.", malus: 1 },
        ],
        solution: "6",
        explanation: "xB − xA = 7 − 1 = 6.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule l'ordonnée du vecteur AB.",
        points: 2,
        difficulty: 1,
        data: { value: 2, tolerance: 0 },
        hints: [
          { text: "L'ordonnée du vecteur AB est yB − yA.", malus: 1 },
          { text: "Calcule 4 − 2.", malus: 1 },
        ],
        solution: "2",
        explanation: "yB − yA = 4 − 2 = 2.",
      },
      {
        type: "NUMERIC",
        statement:
          "Calcule le déterminant des vecteurs AB(6 ; 2) et u(3 ; 1), égal à 6 × 1 − 2 × 3.",
        points: 3,
        difficulty: 2,
        data: { value: 0, tolerance: 0 },
        hints: [
          { text: "Le déterminant de (x ; y) et (x' ; y') est x × y' − y × x'.", malus: 1 },
          { text: "Calcule 6 × 1, puis 2 × 3, puis fais la différence.", malus: 1 },
        ],
        solution: "0",
        explanation: "6 × 1 − 2 × 3 = 6 − 6 = 0.",
      },
      {
        type: "QCM",
        statement: "Que peut-on en conclure sur le point B ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "B appartient à (Δ), car les vecteurs AB et u sont colinéaires (déterminant nul)",
            "B n'appartient pas à (Δ), car le déterminant est nul",
            "B appartient à (Δ) seulement si le déterminant est positif",
            "On ne peut rien conclure",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un point M appartient à (Δ) si, et seulement si, le vecteur AM est colinéaire au vecteur directeur u.", malus: 1 },
          { text: "Le déterminant que tu as calculé est nul : que dit le critère de colinéarité ?", malus: 1 },
        ],
        solution: "B appartient à (Δ), car les vecteurs AB et u sont colinéaires (déterminant nul)",
        explanation:
          "Le déterminant des vecteurs AB et u est nul, donc ces vecteurs sont colinéaires : le point B appartient bien à la droite (Δ).",
      },
      {
        type: "NUMERIC",
        statement:
          "L'équation cartésienne de (Δ) est de la forme x − 3y + c = 0. En utilisant le point A(1 ; 2), quelle est la valeur de c ?",
        points: 4,
        difficulty: 3,
        data: { value: 5, tolerance: 0 },
        hints: [
          { text: "Le point A appartient à (Δ), donc ses coordonnées vérifient l'équation : 1 − 3 × 2 + c = 0.", malus: 1 },
          { text: "Résous 1 − 6 + c = 0.", malus: 1 },
        ],
        solution: "5",
        explanation:
          "Pour un point M(x ; y) de (Δ), le vecteur AM(x − 1 ; y − 2) est colinéaire à u(3 ; 1) : (x − 1) × 1 − (y − 2) × 3 = 0, soit x − 1 − 3y + 6 = 0, donc x − 3y + 5 = 0. On a bien c = 5.",
      },
      {
        type: "NUMERIC",
        statement:
          "Un point C de (Δ) a pour abscisse x = 10. En utilisant l'équation x − 3y + 5 = 0, quelle est son ordonnée y ?",
        points: 4,
        difficulty: 3,
        data: { value: 5, tolerance: 0 },
        hints: [
          { text: "Remplace x par 10 dans x − 3y + 5 = 0.", malus: 1 },
          { text: "Résous 10 − 3y + 5 = 0, c'est-à-dire 15 = 3y.", malus: 1 },
        ],
        solution: "5",
        explanation: "10 − 3y + 5 = 0 équivaut à 15 = 3y, donc y = 5.",
      },
    ],
  },
];
