import type { SeedProblem } from "./types";

export const fonctionsRepresentationProblems: SeedProblem[] = [
  {
    slug: "aire-d-un-carre",
    title: "L'aire d'un carré en fonction du côté",
    difficulty: 2,
    intro:
      "On modélise l'aire d'un carré de côté x (en cm, avec x > 0) par la fonction f définie par f(x) = x².",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule f(5), l'image de 5 par f.",
        points: 2,
        difficulty: 1,
        data: { value: 25, tolerance: 0 },
        hints: [
          { text: "f(x) = x², donc f(5) = 5².", malus: 1 },
          { text: "Calcule 5 × 5.", malus: 1 },
        ],
        solution: "25",
        explanation: "f(5) = 5² = 25.",
      },
      {
        type: "QCM",
        statement: "Quel est l'ensemble de définition de f, sachant que x représente un côté de carré ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["]0 ; +∞[", "ℝ", "[0 ; +∞[", "]−∞ ; 0["],
          correctIndex: 0,
        },
        hints: [
          { text: "Un côté de carré est une longueur : elle ne peut pas être négative ni nulle.", malus: 1 },
          { text: "L'ensemble de définition regroupe toutes les valeurs strictement positives.", malus: 1 },
        ],
        solution: "]0 ; +∞[",
        explanation: "Un côté de carré est une longueur strictement positive : l'ensemble de définition est ]0 ; +∞[.",
      },
      {
        type: "NUMERIC",
        statement: "Détermine un antécédent positif de 64 par f (une valeur de x telle que f(x) = 64).",
        points: 3,
        difficulty: 2,
        data: { value: 8, tolerance: 0 },
        hints: [
          { text: "Cherche x tel que x² = 64.", malus: 1 },
          { text: "Quel nombre positif, multiplié par lui-même, donne 64 ?", malus: 1 },
        ],
        solution: "8",
        explanation: "x² = 64 admet pour solution positive x = 8, car 8² = 64.",
      },
      {
        type: "QCM",
        statement: "L'équation f(x) = 100 admet-elle une solution négative, dans le contexte de ce problème ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Non, car x doit être strictement positif dans ce contexte",
            "Oui, x = −10 convient",
            "Oui, il y a deux solutions valables",
            "Non, l'équation n'a aucune solution",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Mathématiquement, x² = 100 a deux solutions : 10 et −10.", malus: 1 },
          { text: "Mais rappelle-toi l'ensemble de définition de f dans ce contexte : x > 0.", malus: 1 },
        ],
        solution: "Non, car x doit être strictement positif dans ce contexte",
        explanation:
          "L'équation x² = 100 a deux solutions mathématiques, 10 et −10, mais seule x = 10 appartient à l'ensemble de définition ]0 ; +∞[ : dans ce contexte, il n'y a pas de solution négative valable.",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle valeur de x (positive) a-t-on f(x) = 144 ?",
        points: 4,
        difficulty: 3,
        data: { value: 12, tolerance: 0 },
        hints: [
          { text: "Cherche x tel que x² = 144.", malus: 1 },
          { text: "Quel nombre positif, multiplié par lui-même, donne 144 ?", malus: 1 },
        ],
        solution: "12",
        explanation: "x² = 144 admet pour solution positive x = 12, car 12² = 144.",
      },
      {
        type: "TEXT",
        statement:
          "Résous l'inéquation f(x) > 100 pour x > 0, c'est-à-dire x² > 100. Réponds sous la forme x>10.",
        points: 4,
        difficulty: 3,
        data: { accepted: ["x>10"] },
        hints: [
          { text: "Tu sais que f(10) = 100. Pour x > 0, f est croissante : que se passe-t-il pour x > 10 ?", malus: 1 },
          { text: "Pour x > 0, x² > 100 équivaut à x > 10.", malus: 1 },
        ],
        solution: "x>10",
        explanation:
          "Pour x > 0, la fonction carré est croissante. Comme f(10) = 100, on a x² > 100 si, et seulement si, x > 10.",
      },
    ],
  },
  {
    slug: "duree-de-trajet-et-fonction-inverse",
    title: "Durée d'un trajet et fonction inverse",
    difficulty: 2,
    intro:
      "On modélise la durée t (en heures) d'un trajet de 120 km en fonction de la vitesse moyenne v (en km/h, avec v > 0) par t(v) = 120 / v.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule t(60), la durée du trajet à 60 km/h.",
        points: 2,
        difficulty: 1,
        data: { value: 2, tolerance: 0.001 },
        hints: [
          { text: "t(v) = 120 / v, donc t(60) = 120 / 60.", malus: 1 },
          { text: "Effectue la division 120 ÷ 60.", malus: 1 },
        ],
        solution: "2",
        explanation: "t(60) = 120 / 60 = 2 heures.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule t(80), la durée du trajet à 80 km/h.",
        points: 2,
        difficulty: 1,
        data: { value: 1.5, tolerance: 0.001 },
        hints: [
          { text: "t(80) = 120 / 80.", malus: 1 },
          { text: "Simplifie la fraction 120/80, ou effectue directement la division.", malus: 1 },
        ],
        solution: "1,5",
        explanation: "t(80) = 120 / 80 = 1,5 heure.",
      },
      {
        type: "QCM",
        statement: "Quel est l'ensemble de définition de t, sachant que v représente une vitesse ?",
        points: 3,
        difficulty: 2,
        data: {
          options: ["]0 ; +∞[", "ℝ", "[0 ; +∞[", "ℝ*"],
          correctIndex: 0,
        },
        hints: [
          { text: "Une vitesse de déplacement est strictement positive dans ce contexte.", malus: 1 },
          { text: "De plus, une division par 0 est impossible : v = 0 doit être exclu.", malus: 1 },
        ],
        solution: "]0 ; +∞[",
        explanation: "La vitesse v doit être strictement positive (et non nulle, pour éviter une division par 0) : l'ensemble de définition est ]0 ; +∞[.",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle vitesse v obtient-on une durée t(v) = 3 heures ? Résous 120 / v = 3.",
        points: 3,
        difficulty: 2,
        data: { value: 40, tolerance: 0.001 },
        hints: [
          { text: "120 / v = 3 équivaut à 120 = 3v.", malus: 1 },
          { text: "Divise 120 par 3.", malus: 1 },
        ],
        solution: "40",
        explanation: "120 / v = 3 équivaut à 120 = 3v, donc v = 40 km/h.",
      },
      {
        type: "QCM",
        statement: "Comment évolue la durée t(v) quand la vitesse v augmente ?",
        points: 4,
        difficulty: 3,
        data: {
          options: ["Elle diminue", "Elle augmente", "Elle reste constante", "Cela dépend de v"],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare t(60) = 2 h et t(80) = 1,5 h : la vitesse a augmenté, qu'est-il arrivé à la durée ?", malus: 1 },
          { text: "La fonction inverse est décroissante sur ]0 ; +∞[.", malus: 1 },
        ],
        solution: "Elle diminue",
        explanation:
          "t est de la forme k/v avec k > 0 : c'est une fonction inverse, décroissante sur ]0 ; +∞[. Quand la vitesse augmente, la durée du trajet diminue.",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle vitesse v obtient-on une durée t(v) = 0,8 heure ? Résous 120 / v = 0,8.",
        points: 4,
        difficulty: 3,
        data: { value: 150, tolerance: 0.001 },
        hints: [
          { text: "120 / v = 0,8 équivaut à 120 = 0,8v.", malus: 1 },
          { text: "Divise 120 par 0,8.", malus: 1 },
        ],
        solution: "150",
        explanation: "120 / v = 0,8 équivaut à 120 = 0,8v, donc v = 120 / 0,8 = 150 km/h.",
      },
    ],
  },
  {
    slug: "distance-et-fonction-valeur-absolue",
    title: "Distance et fonction valeur absolue",
    difficulty: 3,
    intro: "On définit la fonction h par h(x) = |x − 4|, la distance entre x et 4.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule h(9).",
        points: 2,
        difficulty: 1,
        data: { value: 5, tolerance: 0 },
        hints: [
          { text: "h(9) = |9 − 4|.", malus: 1 },
          { text: "9 − 4 = 5, et 5 est déjà positif.", malus: 1 },
        ],
        solution: "5",
        explanation: "h(9) = |9 − 4| = |5| = 5.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule h(1).",
        points: 2,
        difficulty: 1,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "h(1) = |1 − 4|.", malus: 1 },
          { text: "1 − 4 = −3. La valeur absolue d'un nombre négatif est son opposé.", malus: 1 },
        ],
        solution: "3",
        explanation: "h(1) = |1 − 4| = |−3| = 3.",
      },
      {
        type: "QCM",
        statement: "Quel est l'ensemble de définition de la fonction h ?",
        points: 3,
        difficulty: 2,
        data: {
          options: ["ℝ", "]4 ; +∞[", "[4 ; +∞[", "]−∞ ; 4]"],
          correctIndex: 0,
        },
        hints: [
          { text: "La valeur absolue d'un nombre réel existe-t-elle toujours, quel que soit ce nombre ?", malus: 1 },
          { text: "|x − 4| peut être calculé pour n'importe quel réel x.", malus: 1 },
        ],
        solution: "ℝ",
        explanation: "|x − 4| est défini pour tout réel x : l'ensemble de définition de h est ℝ.",
      },
      {
        type: "NUMERIC",
        statement:
          "Résous l'équation h(x) = 6, c'est-à-dire |x − 4| = 6. Donne la solution supérieure à 4.",
        points: 3,
        difficulty: 2,
        data: { value: 10, tolerance: 0 },
        hints: [
          { text: "|x − 4| = 6 équivaut à x − 4 = 6 ou x − 4 = −6.", malus: 1 },
          { text: "Résous x − 4 = 6.", malus: 1 },
        ],
        solution: "10",
        explanation: "x − 4 = 6 donne x = 10 (l'autre solution, x − 4 = −6, donne x = −2).",
      },
      {
        type: "NUMERIC",
        statement: "Donne l'autre solution de l'équation |x − 4| = 6 (celle qui est inférieure à 4).",
        points: 4,
        difficulty: 3,
        data: { value: -2, tolerance: 0 },
        hints: [
          { text: "Reprends l'équation x − 4 = −6.", malus: 1 },
          { text: "Ajoute 4 aux deux membres.", malus: 1 },
        ],
        solution: "−2",
        explanation: "x − 4 = −6 donne x = −2.",
      },
      {
        type: "TEXT",
        statement:
          "Résous l'inéquation h(x) ⩽ 2, c'est-à-dire |x − 4| ⩽ 2. Réponds sous la forme d'un intervalle [a;b].",
        points: 4,
        difficulty: 3,
        data: { accepted: ["[2;6]"] },
        hints: [
          { text: "L'inéquation |x − a| ⩽ r a pour ensemble de solutions l'intervalle [a − r ; a + r].", malus: 1 },
          { text: "Ici a = 4 et r = 2 : calcule 4 − 2 et 4 + 2.", malus: 1 },
        ],
        solution: "[2 ; 6]",
        explanation:
          "|x − 4| ⩽ 2 équivaut à −2 ⩽ x − 4 ⩽ 2, soit 2 ⩽ x ⩽ 6. L'ensemble des solutions est l'intervalle [2 ; 6].",
      },
    ],
  },
];
