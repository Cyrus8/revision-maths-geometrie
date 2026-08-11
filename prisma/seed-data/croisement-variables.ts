import type { SeedProblem } from "./types";

export const croisementVariablesProblems: SeedProblem[] = [
  {
    slug: "sport-en-club-et-sexe",
    title: "Tableau croisé : pratique sportive et sexe",
    difficulty: 2,
    intro:
      "Dans un lycée de 200 élèves, on a interrogé chaque élève sur la pratique d'un sport en club. Résultats : 40 filles et 60 garçons pratiquent un sport en club ; 60 filles et 40 garçons n'en pratiquent pas.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Combien de filles y a-t-il en tout dans ce lycée ?",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "Additionne les filles qui pratiquent un sport et celles qui n'en pratiquent pas.", malus: 1 },
          { text: "Calcule 40 + 60.", malus: 1 },
        ],
        solution: "100",
        explanation: "40 + 60 = 100 filles au total.",
      },
      {
        type: "NUMERIC",
        statement: "Combien d'élèves au total pratiquent un sport en club (filles et garçons confondus) ?",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "Additionne les filles sportives et les garçons sportifs.", malus: 1 },
          { text: "Calcule 40 + 60.", malus: 1 },
        ],
        solution: "100",
        explanation: "40 + 60 = 100 élèves pratiquent un sport en club.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quelle est la fréquence marginale des filles parmi les 200 élèves, exprimée en pourcentage ?",
        points: 3,
        difficulty: 2,
        data: { value: 50, tolerance: 0.001 },
        hints: [
          { text: "La fréquence marginale des filles est le nombre de filles divisé par l'effectif total.", malus: 1 },
          { text: "Calcule 100 / 200, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "50",
        explanation: "100 / 200 = 0,5, soit 50 %.",
      },
      {
        type: "NUMERIC",
        statement:
          "Parmi les 100 filles, quelle est la fréquence conditionnelle de pratiquer un sport en club, en pourcentage ?",
        points: 3,
        difficulty: 2,
        data: { value: 40, tolerance: 0.001 },
        hints: [
          { text: "Cette fréquence conditionnelle se calcule parmi les filles uniquement : nombre de filles sportives ÷ nombre total de filles.", malus: 1 },
          { text: "Calcule 40 / 100, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "40",
        explanation: "40 / 100 = 0,4, soit 40 % des filles pratiquent un sport en club.",
      },
      {
        type: "NUMERIC",
        statement:
          "Parmi les 100 garçons, quelle est la fréquence conditionnelle de pratiquer un sport en club, en pourcentage ?",
        points: 4,
        difficulty: 3,
        data: { value: 60, tolerance: 0.001 },
        hints: [
          { text: "Cette fréquence conditionnelle se calcule parmi les garçons uniquement : nombre de garçons sportifs ÷ nombre total de garçons.", malus: 1 },
          { text: "Calcule 60 / 100, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "60",
        explanation: "60 / 100 = 0,6, soit 60 % des garçons pratiquent un sport en club.",
      },
      {
        type: "QCM",
        statement:
          "En comparant les fréquences conditionnelles trouvées (40 % chez les filles, 60 % chez les garçons), que peut-on dire ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Les garçons pratiquent proportionnellement plus un sport en club que les filles",
            "Les filles pratiquent proportionnellement plus un sport en club que les garçons",
            "La pratique sportive est indépendante du sexe dans ce lycée",
            "On ne peut rien comparer à partir de fréquences conditionnelles",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare directement les deux pourcentages trouvés.", malus: 1 },
          { text: "60 % est-il supérieur ou inférieur à 40 % ?", malus: 1 },
        ],
        solution: "Les garçons pratiquent proportionnellement plus un sport en club que les filles",
        explanation:
          "60 % des garçons pratiquent un sport en club, contre 40 % des filles : proportionnellement, les garçons de ce lycée sont plus nombreux à pratiquer un sport en club.",
      },
    ],
  },
  {
    slug: "completer-un-tableau-croise",
    title: "Compléter un tableau croisé : théâtre et musique",
    difficulty: 2,
    intro:
      "Une association de 150 membres propose deux activités : théâtre et musique. On sait que 90 membres font du théâtre, parmi lesquels 30 font aussi de la musique. Au total, 70 membres font de la musique.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Combien de membres font à la fois du théâtre et de la musique ?",
        points: 2,
        difficulty: 1,
        data: { value: 30, tolerance: 0 },
        hints: [
          { text: "Cette information est donnée directement dans l'énoncé.", malus: 1 },
          { text: "Relis la phrase \"parmi lesquels 30 font aussi de la musique\".", malus: 1 },
        ],
        solution: "30",
        explanation: "L'énoncé indique directement que 30 membres font les deux activités.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de membres font du théâtre au total ?",
        points: 2,
        difficulty: 1,
        data: { value: 90, tolerance: 0 },
        hints: [
          { text: "Cette information est donnée directement dans l'énoncé.", malus: 1 },
          { text: "Relis la première phrase de l'énoncé.", malus: 1 },
        ],
        solution: "90",
        explanation: "L'énoncé indique directement que 90 membres font du théâtre.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de membres font du théâtre uniquement (sans la musique) ?",
        points: 3,
        difficulty: 2,
        data: { value: 60, tolerance: 0 },
        hints: [
          { text: "Parmi les membres qui font du théâtre, certains font aussi de la musique.", malus: 1 },
          { text: "Calcule 90 − 30.", malus: 1 },
        ],
        solution: "60",
        explanation: "90 − 30 = 60 membres font du théâtre uniquement, sans la musique.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de membres font de la musique uniquement (sans le théâtre) ?",
        points: 3,
        difficulty: 2,
        data: { value: 40, tolerance: 0 },
        hints: [
          { text: "Parmi les 70 membres qui font de la musique, certains font aussi du théâtre (les 30 déjà comptés).", malus: 1 },
          { text: "Calcule 70 − 30.", malus: 1 },
        ],
        solution: "40",
        explanation: "70 − 30 = 40 membres font de la musique uniquement, sans le théâtre.",
      },
      {
        type: "NUMERIC",
        statement:
          "Combien de membres au total pratiquent au moins une des deux activités (théâtre ou musique) ?",
        points: 4,
        difficulty: 3,
        data: { value: 130, tolerance: 0 },
        hints: [
          { text: "Additionne : théâtre uniquement + musique uniquement + les deux à la fois.", malus: 1 },
          { text: "Calcule 60 + 40 + 30.", malus: 1 },
        ],
        solution: "130",
        explanation: "60 (théâtre seul) + 40 (musique seule) + 30 (les deux) = 130 membres pratiquent au moins une activité.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de membres ne pratiquent ni le théâtre ni la musique ?",
        points: 4,
        difficulty: 3,
        data: { value: 20, tolerance: 0 },
        hints: [
          { text: "Soustrais le nombre de membres pratiquant au moins une activité à l'effectif total de l'association.", malus: 1 },
          { text: "Calcule 150 − 130.", malus: 1 },
        ],
        solution: "20",
        explanation: "150 − 130 = 20 membres ne pratiquent ni le théâtre ni la musique.",
      },
    ],
  },
  {
    slug: "sondage-marque-de-smartphone",
    title: "Sondage sur la marque de smartphone préférée",
    difficulty: 3,
    showCalculator: true,
    intro:
      "Un sondage sur la marque de smartphone préférée a été réalisé auprès de 300 personnes, réparties en deux tranches d'âge. Chez les 15-25 ans (180 personnes), 108 préfèrent la marque A, les autres la marque B. Chez les 26 ans et plus (120 personnes), 36 préfèrent la marque A, les autres la marque B.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Combien de personnes de 15-25 ans préfèrent la marque B ?",
        points: 2,
        difficulty: 1,
        data: { value: 72, tolerance: 0 },
        hints: [
          { text: "Chaque personne de cette tranche d'âge préfère soit la marque A, soit la marque B.", malus: 1 },
          { text: "Calcule 180 − 108.", malus: 1 },
        ],
        solution: "72",
        explanation: "180 − 108 = 72 personnes de 15-25 ans préfèrent la marque B.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de personnes de 26 ans et plus préfèrent la marque B ?",
        points: 2,
        difficulty: 1,
        data: { value: 84, tolerance: 0 },
        hints: [
          { text: "Chaque personne de cette tranche d'âge préfère soit la marque A, soit la marque B.", malus: 1 },
          { text: "Calcule 120 − 36.", malus: 1 },
        ],
        solution: "84",
        explanation: "120 − 36 = 84 personnes de 26 ans et plus préfèrent la marque B.",
      },
      {
        type: "NUMERIC",
        statement: "Combien de personnes au total préfèrent la marque A (les deux tranches d'âge confondues) ?",
        points: 3,
        difficulty: 2,
        data: { value: 144, tolerance: 0 },
        hints: [
          { text: "Additionne les deux effectifs préférant la marque A.", malus: 1 },
          { text: "Calcule 108 + 36.", malus: 1 },
        ],
        solution: "144",
        explanation: "108 + 36 = 144 personnes préfèrent la marque A au total.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quelle est la fréquence marginale des 15-25 ans dans l'échantillon total de 300 personnes, en pourcentage ?",
        points: 3,
        difficulty: 2,
        data: { value: 60, tolerance: 0.001 },
        hints: [
          { text: "Divise l'effectif des 15-25 ans par l'effectif total.", malus: 1 },
          { text: "Calcule 180 / 300, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "60",
        explanation: "180 / 300 = 0,6, soit 60 %.",
      },
      {
        type: "NUMERIC",
        statement:
          "Parmi les 15-25 ans (180 personnes), quelle est la fréquence conditionnelle de préférer la marque A, en pourcentage ?",
        points: 4,
        difficulty: 3,
        data: { value: 60, tolerance: 0.001 },
        hints: [
          { text: "Cette fréquence conditionnelle se calcule uniquement parmi les 15-25 ans.", malus: 1 },
          { text: "Calcule 108 / 180, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "60",
        explanation: "108 / 180 = 0,6, soit 60 % des 15-25 ans préfèrent la marque A.",
      },
      {
        type: "NUMERIC",
        statement:
          "Parmi les 26 ans et plus (120 personnes), quelle est la fréquence conditionnelle de préférer la marque A, en pourcentage ?",
        points: 4,
        difficulty: 3,
        data: { value: 30, tolerance: 0.001 },
        hints: [
          { text: "Cette fréquence conditionnelle se calcule uniquement parmi les 26 ans et plus.", malus: 1 },
          { text: "Calcule 36 / 120, puis convertis en pourcentage.", malus: 1 },
        ],
        solution: "30",
        explanation:
          "36 / 120 = 0,3, soit 30 % des 26 ans et plus préfèrent la marque A. La marque A est donc proportionnellement bien plus populaire chez les 15-25 ans.",
      },
    ],
  },
];
