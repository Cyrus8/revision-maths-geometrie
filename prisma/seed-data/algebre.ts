import type { SeedProblem } from "./types";

export const algebreProblems: SeedProblem[] = [
  {
    slug: "comparer-deux-locations-de-velo",
    title: "Comparer deux offres de location de vélo",
    difficulty: 2,
    intro:
      "Deux entreprises proposent la location d'un vélo. Entreprise A : 8 € de frais fixes puis 3 € par jour. Entreprise B : 5 € par jour, sans frais fixes. On note x le nombre de jours de location.",
    questions: [
      {
        type: "QCM",
        statement: "Quelle expression donne le prix (en €) pour x jours avec l'entreprise A ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["8 + 3x", "3 + 8x", "8x + 3", "8 × 3 × x"],
          correctIndex: 0,
        },
        hints: [
          { text: "Il y a un montant fixe, payé une seule fois, et un montant qui dépend du nombre de jours x.", malus: 1 },
          { text: "Les frais fixes s'ajoutent au prix par jour multiplié par le nombre de jours.", malus: 1 },
        ],
        solution: "8 + 3x",
        explanation: "Le prix est constitué des frais fixes (8 €) plus 3 € par jour, soit 8 + 3x.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le prix avec l'entreprise A pour x = 5 jours ?",
        points: 2,
        difficulty: 1,
        data: { value: 23, tolerance: 0 },
        hints: [
          { text: "Remplace x par 5 dans l'expression 8 + 3x.", malus: 1 },
          { text: "Calcule 8 + 3 × 5.", malus: 1 },
        ],
        solution: "23",
        explanation: "8 + 3 × 5 = 8 + 15 = 23 €.",
      },
      {
        type: "NUMERIC",
        statement:
          "Résous l'équation 8 + 3x = 5x pour trouver le nombre de jours x à partir duquel les deux prix sont égaux.",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0 },
        hints: [
          { text: "Regroupe les termes en x d'un côté : soustrais 3x aux deux membres.", malus: 1 },
          { text: "Tu obtiens 8 = 2x. Divise par 2.", malus: 1 },
        ],
        solution: "4",
        explanation: "8 + 3x = 5x équivaut à 8 = 5x − 3x, soit 8 = 2x, donc x = 4.",
      },
      {
        type: "QCM",
        statement: "Pour x = 6 jours, quelle entreprise est la moins chère ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Entreprise A, car 26 € < 30 €",
            "Entreprise B, car elle n'a pas de frais fixes",
            "Les deux prix sont égaux",
            "Entreprise B, car 30 € < 26 €",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Calcule le prix A(6) = 8 + 3 × 6 et le prix B(6) = 5 × 6.", malus: 1 },
          { text: "Compare les deux résultats obtenus.", malus: 1 },
        ],
        solution: "Entreprise A, car 26 € < 30 €",
        explanation: "A(6) = 8 + 18 = 26 € et B(6) = 30 €. Comme 26 < 30, l'entreprise A est moins chère.",
      },
      {
        type: "TEXT",
        statement:
          "Résous l'inéquation 8 + 3x < 5x. Réponds sous la forme x>4 pour donner les valeurs de x pour lesquelles l'entreprise A est strictement moins chère que B.",
        points: 4,
        difficulty: 3,
        data: { accepted: ["x>4"] },
        hints: [
          { text: "Procède comme pour l'équation : regroupe les x d'un côté, en gardant le sens de l'inégalité (on divise par un nombre positif).", malus: 1 },
          { text: "8 + 3x < 5x équivaut à 8 < 2x, puis à x > 4.", malus: 1 },
        ],
        solution: "x>4",
        explanation:
          "8 + 3x < 5x équivaut à 8 < 5x − 3x, soit 8 < 2x, donc x > 4 (on divise par 2, un nombre positif, le sens de l'inégalité est conservé).",
      },
      {
        type: "NUMERIC",
        statement:
          "Un client loue le vélo pendant 10 jours. Quelle économie (en €) réalise-t-il en choisissant l'entreprise la moins chère plutôt que l'autre ?",
        points: 4,
        difficulty: 3,
        data: { value: 12, tolerance: 0 },
        hints: [
          { text: "Calcule A(10) = 8 + 3 × 10 et B(10) = 5 × 10.", malus: 1 },
          { text: "Comme 10 > 4, l'entreprise A est la moins chère. Calcule la différence B(10) − A(10).", malus: 1 },
        ],
        solution: "12",
        explanation: "A(10) = 38 € et B(10) = 50 €. L'économie réalisée en choisissant A est 50 − 38 = 12 €.",
      },
    ],
  },
  {
    slug: "identites-remarquables-et-terrain",
    title: "Identités remarquables et aménagement d'un terrain",
    difficulty: 2,
    intro:
      "Un jardinier possède un terrain carré de côté x mètres (avec x > 3). Il transforme ce terrain en rectangle en augmentant une dimension de 3 m et en diminuant l'autre de 3 m.",
    questions: [
      {
        type: "QCM",
        statement: "Quelle est l'aire du terrain carré initial, en fonction de x ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["x²", "2x", "x² + 9", "4x"],
          correctIndex: 0,
        },
        hints: [
          { text: "L'aire d'un carré de côté c est c².", malus: 1 },
          { text: "Ici le côté est x.", malus: 1 },
        ],
        solution: "x²",
        explanation: "L'aire d'un carré de côté x est x².",
      },
      {
        type: "NUMERIC",
        statement: "Pour x = 10 m, quelle est l'aire du terrain carré initial (en m²) ?",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "Remplace x par 10 dans x².", malus: 1 },
          { text: "Calcule 10².", malus: 1 },
        ],
        solution: "100",
        explanation: "10² = 100 m².",
      },
      {
        type: "QCM",
        statement:
          "Les nouvelles dimensions du rectangle sont (x + 3) et (x − 3). Quelle est l'expression développée de son aire (x + 3)(x − 3) ?",
        points: 3,
        difficulty: 2,
        data: {
          options: ["x² − 9", "x² + 9", "x² − 6x + 9", "x² − 3x"],
          correctIndex: 0,
        },
        hints: [
          { text: "Reconnais l'identité remarquable (a + b)(a − b) = a² − b².", malus: 1 },
          { text: "Ici a = x et b = 3 : calcule x² − 3².", malus: 1 },
        ],
        solution: "x² − 9",
        explanation: "(x + 3)(x − 3) = x² − 3² = x² − 9, en utilisant l'identité (a + b)(a − b) = a² − b².",
      },
      {
        type: "NUMERIC",
        statement: "Pour x = 10 m, quelle est l'aire du rectangle (x + 3)(x − 3), en m² ?",
        points: 3,
        difficulty: 2,
        data: { value: 91, tolerance: 0 },
        hints: [
          { text: "Utilise le résultat x² − 9 avec x = 10, ou calcule directement 13 × 7.", malus: 1 },
          { text: "10² − 9 = 100 − 9.", malus: 1 },
        ],
        solution: "91",
        explanation: "(10 + 3)(10 − 3) = 13 × 7 = 91, ce qui correspond bien à 10² − 9 = 91.",
      },
      {
        type: "QCM",
        statement:
          "En comparant l'aire du carré (x²) et l'aire du rectangle (x² − 9), que peut-on dire de la transformation, quelle que soit la valeur de x ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Le jardinier perd 9 m², quelle que soit la valeur de x",
            "Le jardinier gagne 9 m², quelle que soit la valeur de x",
            "Cela dépend de la valeur de x",
            "Il n'y a aucun changement de surface",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare directement les deux expressions x² et x² − 9.", malus: 1 },
          { text: "La différence x² − (x² − 9) ne dépend pas de x.", malus: 1 },
        ],
        solution: "Le jardinier perd 9 m², quelle que soit la valeur de x",
        explanation:
          "L'aire du rectangle est x² − 9, toujours inférieure de 9 m² à l'aire du carré x², quelle que soit la valeur de x. C'est l'intérêt du calcul littéral : le résultat est général, valable pour toute valeur de x.",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle valeur de x (avec x > 3) le rectangle aurait-il une aire de 91 m² ?",
        points: 4,
        difficulty: 3,
        data: { value: 10, tolerance: 0 },
        hints: [
          { text: "Pose l'équation x² − 9 = 91.", malus: 1 },
          { text: "Isole x² puis résous l'équation du type x² = a, en ne gardant que la solution positive supérieure à 3.", malus: 1 },
        ],
        solution: "10",
        explanation: "x² − 9 = 91 équivaut à x² = 100, donc x = 10 ou x = −10. Comme x > 3, on garde x = 10.",
      },
    ],
  },
  {
    slug: "signe-et-equation-produit-quotient",
    title: "Signe d'une expression, équation produit et quotient",
    difficulty: 3,
    intro: "On étudie l'expression f(x) = (x − 2)(x + 4) pour x réel.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule f(2), c'est-à-dire (2 − 2)(2 + 4).",
        points: 2,
        difficulty: 1,
        data: { value: 0, tolerance: 0 },
        hints: [
          { text: "Calcule d'abord chaque facteur séparément : (2 − 2) et (2 + 4).", malus: 1 },
          { text: "Un produit dont l'un des facteurs est nul est toujours nul.", malus: 1 },
        ],
        solution: "0",
        explanation: "(2 − 2)(2 + 4) = 0 × 6 = 0.",
      },
      {
        type: "QCM",
        statement: "Quelles sont les solutions de l'équation (x − 2)(x + 4) = 0 ?",
        points: 2,
        difficulty: 1,
        data: {
          options: [
            "x = 2 ou x = −4",
            "x = 2 et x = −4 en même temps",
            "x = 2 uniquement",
            "x = −2 ou x = 4",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un produit de facteurs est nul si, et seulement si, l'un au moins des facteurs est nul.", malus: 1 },
          { text: "Résous séparément x − 2 = 0 et x + 4 = 0.", malus: 1 },
        ],
        solution: "x = 2 ou x = −4",
        explanation:
          "Une équation produit nul A(x)B(x) = 0 a pour solutions les valeurs qui annulent A(x) ou B(x) : ici x − 2 = 0 donne x = 2, et x + 4 = 0 donne x = −4.",
      },
      {
        type: "QCM",
        statement: "Quel est le signe de (x − 2) lorsque x < 2 ?",
        points: 3,
        difficulty: 2,
        data: {
          options: ["Négatif", "Positif", "Nul", "Cela dépend de x + 4"],
          correctIndex: 0,
        },
        hints: [
          { text: "x − 2 s'annule en x = 2.", malus: 1 },
          { text: "Teste une valeur, par exemple x = 0 : que vaut 0 − 2 ?", malus: 1 },
        ],
        solution: "Négatif",
        explanation: "Pour x < 2, on a x − 2 < 0 : l'expression (x − 2) est négative.",
      },
      {
        type: "QCM",
        statement: "Quel est le signe du produit (x − 2)(x + 4) pour x = 5 ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Positif, car (5 − 2) et (5 + 4) sont tous deux positifs",
            "Négatif, car 5 est positif",
            "Positif, car 5 est supérieur à 4",
            "Négatif, car (5 − 2) est positif mais (5 + 4) est négatif",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Calcule le signe de chaque facteur pour x = 5 : (5 − 2) et (5 + 4).", malus: 1 },
          { text: "Le produit de deux nombres positifs est positif.", malus: 1 },
        ],
        solution: "Positif, car (5 − 2) et (5 + 4) sont tous deux positifs",
        explanation:
          "Pour x = 5 : x − 2 = 3 > 0 et x + 4 = 9 > 0. Le produit de deux nombres positifs est positif : (x − 2)(x + 4) = 27 > 0.",
      },
      {
        type: "NUMERIC",
        statement:
          "Résous l'équation quotient (x − 2)/(x + 4) = 0. Quelle est la valeur de x solution ?",
        points: 4,
        difficulty: 3,
        data: { value: 2, tolerance: 0 },
        hints: [
          { text: "Une fraction est nulle si, et seulement si, son numérateur est nul (et son dénominateur non nul).", malus: 1 },
          { text: "Résous x − 2 = 0, puis vérifie que cette valeur n'annule pas le dénominateur x + 4.", malus: 1 },
        ],
        solution: "2",
        explanation:
          "(x − 2)/(x + 4) = 0 équivaut à x − 2 = 0 (avec x + 4 ≠ 0). On trouve x = 2, et 2 + 4 = 6 ≠ 0 : cette solution est valable.",
      },
      {
        type: "NUMERIC",
        statement:
          "L'expression (x − 2)/(x + 4) n'est pas définie pour une valeur de x, qui annule le dénominateur. Laquelle ?",
        points: 4,
        difficulty: 3,
        data: { value: -4, tolerance: 0 },
        hints: [
          { text: "Une fraction n'est pas définie lorsque son dénominateur est nul.", malus: 1 },
          { text: "Résous l'équation x + 4 = 0.", malus: 1 },
        ],
        solution: "−4",
        explanation:
          "Le dénominateur x + 4 s'annule pour x = −4. L'expression (x − 2)/(x + 4) n'est donc pas définie en x = −4 : l'ensemble de définition exclut cette valeur.",
      },
    ],
  },
];
