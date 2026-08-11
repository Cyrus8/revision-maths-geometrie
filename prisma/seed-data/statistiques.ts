import type { SeedProblem } from "./types";

export const statistiquesProblems: SeedProblem[] = [
  {
    slug: "evolutions-successives-d-un-prix",
    title: "Évolutions successives du prix d'un article",
    difficulty: 2,
    showCalculator: true,
    intro:
      "Le prix d'un article était de 80 € en janvier. Il augmente de 25 % en février, puis diminue de 20 % en mars.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quel est le prix de l'article après l'augmentation de 25 % en février ?",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0.001 },
        hints: [
          { text: "Augmenter de 25 %, c'est multiplier par 1,25.", malus: 1 },
          { text: "Calcule 80 × 1,25.", malus: 1 },
        ],
        solution: "100",
        explanation: "80 × 1,25 = 100 €.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le coefficient multiplicateur associé à une augmentation de 25 % ?",
        points: 2,
        difficulty: 1,
        data: { value: 1.25, tolerance: 0.001 },
        hints: [
          { text: "Le coefficient multiplicateur d'une augmentation de t % est 1 + t/100.", malus: 1 },
          { text: "Calcule 1 + 25/100.", malus: 1 },
        ],
        solution: "1,25",
        explanation: "Le coefficient multiplicateur est 1 + 25/100 = 1,25.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le prix de l'article après la baisse de 20 % en mars (appliquée aux 100 € de février) ?",
        points: 3,
        difficulty: 2,
        data: { value: 80, tolerance: 0.001 },
        hints: [
          { text: "Diminuer de 20 %, c'est multiplier par 0,8.", malus: 1 },
          { text: "Calcule 100 × 0,8.", malus: 1 },
        ],
        solution: "80",
        explanation: "100 × 0,8 = 80 €.",
      },
      {
        type: "QCM",
        statement: "En comparant le prix final (mars, 80 €) au prix initial (janvier, 80 €), que peut-on dire ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Le prix final est égal au prix initial",
            "Le prix final est supérieur au prix initial",
            "Le prix final est inférieur au prix initial",
            "On ne peut pas comparer sans plus d'informations",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare directement les deux valeurs : 80 € en janvier et 80 € en mars.", malus: 1 },
          { text: "Une hausse de 25 % suivie d'une baisse de 20 % ne se compense pas toujours, mais ici c'est le cas : vérifie les deux montants.", malus: 1 },
        ],
        solution: "Le prix final est égal au prix initial",
        explanation:
          "Le prix initial (80 €) et le prix final (80 €) sont égaux : dans ce cas précis, la hausse de 25 % et la baisse de 20 % se compensent exactement.",
      },
      {
        type: "NUMERIC",
        statement:
          "Calcule le coefficient multiplicateur global de janvier à mars, en multipliant les deux coefficients (1,25 × 0,8).",
        points: 4,
        difficulty: 3,
        data: { value: 1, tolerance: 0.001 },
        hints: [
          { text: "Pour des évolutions successives, on multiplie les coefficients multiplicateurs.", malus: 1 },
          { text: "Calcule 1,25 × 0,8.", malus: 1 },
        ],
        solution: "1",
        explanation: "1,25 × 0,8 = 1 : le coefficient multiplicateur global est 1, ce qui confirme que le prix final est égal au prix initial.",
      },
      {
        type: "QCM",
        statement: "Un coefficient multiplicateur global de 1 correspond à quel taux d'évolution global ?",
        points: 4,
        difficulty: 3,
        data: {
          options: ["0 %", "5 %", "25 %", "−20 %"],
          correctIndex: 0,
        },
        hints: [
          { text: "Un coefficient multiplicateur k correspond à un taux d'évolution de (k − 1) × 100 %.", malus: 1 },
          { text: "Calcule (1 − 1) × 100.", malus: 1 },
        ],
        solution: "0 %",
        explanation: "Un coefficient multiplicateur de 1 correspond à un taux d'évolution de (1 − 1) × 100 = 0 % : aucune évolution globale.",
      },
    ],
  },
  {
    slug: "moyenne-ponderee-par-classes",
    title: "Moyenne pondérée d'une série regroupée en classes",
    difficulty: 2,
    showCalculator: true,
    intro:
      "Un professeur regroupe les notes (sur 20) de sa classe en classes d'amplitude 5 : [0 ; 5[ → 2 élèves, [5 ; 10[ → 6 élèves, [10 ; 15[ → 10 élèves, [15 ; 20] → 2 élèves. On suppose une répartition uniforme dans chaque classe, et on utilise donc son centre pour les calculs.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quel est l'effectif total de la classe ?",
        points: 2,
        difficulty: 1,
        data: { value: 20, tolerance: 0 },
        hints: [
          { text: "Additionne les effectifs des quatre classes.", malus: 1 },
          { text: "Calcule 2 + 6 + 10 + 2.", malus: 1 },
        ],
        solution: "20",
        explanation: "2 + 6 + 10 + 2 = 20 élèves.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le centre de la classe [5 ; 10[ ?",
        points: 2,
        difficulty: 1,
        data: { value: 7.5, tolerance: 0.001 },
        hints: [
          { text: "Le centre d'une classe [a ; b[ est (a + b) / 2.", malus: 1 },
          { text: "Calcule (5 + 10) / 2.", malus: 1 },
        ],
        solution: "7,5",
        explanation: "Le centre de [5 ; 10[ est (5 + 10) / 2 = 7,5.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quelle est la contribution de la classe [10 ; 15[ à la somme pondérée des notes (effectif × centre = 10 × 12,5) ?",
        points: 3,
        difficulty: 2,
        data: { value: 125, tolerance: 0.001 },
        hints: [
          { text: "Le centre de [10 ; 15[ est 12,5.", malus: 1 },
          { text: "Calcule 10 × 12,5.", malus: 1 },
        ],
        solution: "125",
        explanation: "10 × 12,5 = 125.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quelle est la somme pondérée de toutes les classes ? (2 × 2,5) + (6 × 7,5) + (10 × 12,5) + (2 × 17,5)",
        points: 3,
        difficulty: 2,
        data: { value: 210, tolerance: 0.001 },
        hints: [
          { text: "Calcule chaque produit séparément : 2×2,5=5 ; 6×7,5=45 ; 10×12,5=125 ; 2×17,5=35.", malus: 1 },
          { text: "Additionne ces quatre résultats.", malus: 1 },
        ],
        solution: "210",
        explanation: "5 + 45 + 125 + 35 = 210.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la moyenne pondérée de la classe (somme pondérée ÷ effectif total) ?",
        points: 4,
        difficulty: 3,
        data: { value: 10.5, tolerance: 0.001 },
        hints: [
          { text: "Divise la somme pondérée (210) par l'effectif total (20).", malus: 1 },
          { text: "Calcule 210 ÷ 20.", malus: 1 },
        ],
        solution: "10,5",
        explanation: "210 ÷ 20 = 10,5 : la moyenne pondérée de la classe est 10,5/20.",
      },
      {
        type: "QCM",
        statement:
          "Les effectifs cumulés des classes sont 2, puis 8, puis 18, puis 20. Sachant qu'il y a 20 élèves, quelle est la classe médiane ?",
        points: 4,
        difficulty: 3,
        data: {
          options: ["[10 ; 15[", "[5 ; 10[", "[15 ; 20]", "[0 ; 5["],
          correctIndex: 0,
        },
        hints: [
          { text: "Avec 20 élèves, la médiane se situe entre le 10e et le 11e élève, une fois les notes rangées dans l'ordre.", malus: 1 },
          { text: "Repère dans quelle classe l'effectif cumulé atteint ou dépasse 10 et 11 pour la première fois.", malus: 1 },
        ],
        solution: "[10 ; 15[",
        explanation:
          "L'effectif cumulé atteint 8 à la fin de [5 ; 10[ (pas encore 10), puis 18 à la fin de [10 ; 15[. Les 10e et 11e élèves se trouvent donc dans la classe [10 ; 15[, qui est la classe médiane.",
      },
    ],
  },
  {
    slug: "comparer-deux-series-avec-l-ecart-type",
    title: "Comparer deux séries statistiques avec l'écart type",
    difficulty: 3,
    showCalculator: true,
    intro:
      "Deux équipes de basket ont marqué des paniers lors de 5 matchs. Équipe A : 9, 11, 12, 13, 15. Équipe B : 6, 10, 12, 14, 18.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule la moyenne de l'équipe A : (9 + 11 + 12 + 13 + 15) / 5.",
        points: 2,
        difficulty: 1,
        data: { value: 12, tolerance: 0.001 },
        hints: [
          { text: "Additionne d'abord les cinq valeurs.", malus: 1 },
          { text: "9 + 11 + 12 + 13 + 15 = 60. Divise par 5.", malus: 1 },
        ],
        solution: "12",
        explanation: "(9 + 11 + 12 + 13 + 15) / 5 = 60 / 5 = 12.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule la moyenne de l'équipe B : (6 + 10 + 12 + 14 + 18) / 5.",
        points: 2,
        difficulty: 1,
        data: { value: 12, tolerance: 0.001 },
        hints: [
          { text: "Additionne d'abord les cinq valeurs.", malus: 1 },
          { text: "6 + 10 + 12 + 14 + 18 = 60. Divise par 5.", malus: 1 },
        ],
        solution: "12",
        explanation: "(6 + 10 + 12 + 14 + 18) / 5 = 60 / 5 = 12 : les deux équipes ont la même moyenne.",
      },
      {
        type: "NUMERIC",
        statement:
          "Pour l'équipe A, calcule l'écart entre le score du match à 15 paniers et la moyenne (15 − 12), puis élève ce résultat au carré.",
        points: 3,
        difficulty: 2,
        data: { value: 9, tolerance: 0 },
        hints: [
          { text: "Calcule d'abord 15 − 12.", malus: 1 },
          { text: "Élève le résultat au carré.", malus: 1 },
        ],
        solution: "9",
        explanation: "15 − 12 = 3, puis 3² = 9.",
      },
      {
        type: "NUMERIC",
        statement:
          "Sachant que la somme des cinq écarts au carré à la moyenne pour l'équipe A vaut 20, quelle est sa variance (20 ÷ 5) ?",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0.001 },
        hints: [
          { text: "La variance est la moyenne des écarts au carré à la moyenne.", malus: 1 },
          { text: "Calcule 20 ÷ 5.", malus: 1 },
        ],
        solution: "4",
        explanation: "20 ÷ 5 = 4 : la variance de l'équipe A est 4.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est l'écart type de l'équipe A (racine carrée de la variance) ?",
        points: 4,
        difficulty: 3,
        data: { value: 2, tolerance: 0.001 },
        hints: [
          { text: "L'écart type est la racine carrée de la variance.", malus: 1 },
          { text: "Calcule √4.", malus: 1 },
        ],
        solution: "2",
        explanation: "√4 = 2 : l'écart type de l'équipe A est 2 paniers.",
      },
      {
        type: "QCM",
        statement:
          "L'écart type de l'équipe B vaut 4 (le double de celui de l'équipe A), alors que les deux équipes ont la même moyenne (12). Que peut-on en conclure ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Les scores de l'équipe B sont plus dispersés (moins réguliers) autour de la moyenne que ceux de l'équipe A",
            "L'équipe B est globalement meilleure que l'équipe A",
            "Les deux équipes ont des performances identiques d'un match à l'autre",
            "L'écart type ne permet pas de comparer deux séries",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "L'écart type mesure la dispersion des valeurs autour de la moyenne : plus il est grand, plus les valeurs sont étalées.", malus: 1 },
          { text: "Les deux équipes ont la même moyenne : seule leur régularité les différencie.", malus: 1 },
        ],
        solution: "Les scores de l'équipe B sont plus dispersés (moins réguliers) autour de la moyenne que ceux de l'équipe A",
        explanation:
          "Avec une moyenne identique (12) mais un écart type deux fois plus grand, l'équipe B a des scores plus irréguliers d'un match à l'autre, tandis que l'équipe A est plus régulière autour de sa moyenne.",
      },
    ],
  },
];
