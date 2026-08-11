import type { SeedProblem } from "./types";

export const nombresReelsProblems: SeedProblem[] = [
  {
    slug: "tolerance-de-fabrication",
    title: "La tolérance de fabrication d'une pièce",
    difficulty: 2,
    intro:
      "Une pièce mécanique doit mesurer 50 mm. Pour être acceptée, sa longueur réelle x (en mm) doit vérifier |x − 50| ⩽ 0,3 : c'est la tolérance de fabrication.",
    questions: [
      {
        type: "QCM",
        statement: "Quel intervalle décrit l'ensemble des longueurs x acceptables ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["[49,7 ; 50,3]", "]49,7 ; 50,3[", "[49,3 ; 50,7]", "[50 ; 50,3]"],
          correctIndex: 0,
        },
        hints: [
          { text: "L'inéquation |x − a| ⩽ r équivaut à a − r ⩽ x ⩽ a + r.", malus: 1 },
          { text: "Ici a = 50 et r = 0,3 : calcule 50 − 0,3 et 50 + 0,3.", malus: 1 },
        ],
        solution: "[49,7 ; 50,3]",
        explanation:
          "|x − 50| ⩽ 0,3 équivaut à −0,3 ⩽ x − 50 ⩽ 0,3, soit 49,7 ⩽ x ⩽ 50,3. L'intervalle est donc [49,7 ; 50,3], avec des crochets fermés car l'inégalité est large (⩽).",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'amplitude (la longueur) de l'intervalle des longueurs acceptables ?",
        points: 2,
        difficulty: 1,
        data: { value: 0.6, tolerance: 0.001 },
        hints: [
          { text: "L'amplitude d'un intervalle [a ; b] est b − a.", malus: 1 },
          { text: "Calcule 50,3 − 49,7.", malus: 1 },
        ],
        solution: "0,6",
        explanation: "L'amplitude est 50,3 − 49,7 = 0,6 mm (ce qui correspond bien à 2 × 0,3).",
      },
      {
        type: "NUMERIC",
        statement: "Une pièce mesure x = 50,25 mm. Quelle est la distance entre x et 50, c'est-à-dire |x − 50| ?",
        points: 3,
        difficulty: 2,
        data: { value: 0.25, tolerance: 0.001 },
        hints: [
          { text: "La distance entre deux réels a et b est |a − b|.", malus: 1 },
          { text: "Calcule 50,25 − 50, puis prends la valeur absolue du résultat.", malus: 1 },
        ],
        solution: "0,25",
        explanation: "|50,25 − 50| = |0,25| = 0,25.",
      },
      {
        type: "QCM",
        statement: "Cette pièce (x = 50,25 mm) est-elle conforme à la tolérance ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Oui, car |50,25 − 50| = 0,25 ⩽ 0,3",
            "Non, car 50,25 est supérieur à 50",
            "Oui, car 50,25 est proche de 50,3",
            "Non, car la distance dépasse 0,3",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Une pièce est conforme si |x − 50| ⩽ 0,3.", malus: 1 },
          { text: "Tu as calculé à la question précédente que |50,25 − 50| = 0,25.", malus: 1 },
        ],
        solution: "Oui, car |50,25 − 50| = 0,25 ⩽ 0,3",
        explanation: "Comme 0,25 ⩽ 0,3, la condition |x − 50| ⩽ 0,3 est vérifiée : la pièce est conforme.",
      },
      {
        type: "TEXT",
        statement:
          "Une seconde pièce mesure x = 49,65 mm. Est-elle conforme à la tolérance ? Réponds par \"oui\" ou \"non\".",
        points: 4,
        difficulty: 3,
        data: { accepted: ["non"] },
        hints: [
          { text: "Calcule d'abord |49,65 − 50|.", malus: 1 },
          { text: "Compare cette distance à 0,3 : est-elle inférieure ou égale, ou strictement supérieure ?", malus: 1 },
        ],
        solution: "non",
        explanation:
          "|49,65 − 50| = 0,35. Comme 0,35 > 0,3, la condition n'est pas vérifiée : cette pièce n'est pas conforme.",
      },
      {
        type: "NUMERIC",
        statement:
          "Pour cette pièce non conforme (x = 49,65 mm), de combien dépasse-t-elle la tolérance autorisée ? (calcule |x − 50| − 0,3)",
        points: 4,
        difficulty: 3,
        data: { value: 0.05, tolerance: 0.001 },
        hints: [
          { text: "Tu as trouvé |49,65 − 50| = 0,35 à la question précédente.", malus: 1 },
          { text: "Calcule 0,35 − 0,3.", malus: 1 },
        ],
        solution: "0,05",
        explanation: "0,35 − 0,3 = 0,05 : la pièce dépasse la tolérance autorisée de 0,05 mm.",
      },
    ],
  },
  {
    slug: "encadrer-des-nombres-reels",
    title: "Encadrer et comprendre des nombres réels",
    difficulty: 2,
    intro:
      "On étudie trois nombres réels particuliers, √2, 1/3 et π, pour les encadrer et déterminer leur nature (décimal, rationnel ou irrationnel).",
    questions: [
      {
        type: "QCM",
        statement: "Le nombre √2 appartient à quel intervalle ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["[1,4 ; 1,5]", "[1 ; 1,4[", "[1,5 ; 2]", "[2 ; 3]"],
          correctIndex: 0,
        },
        hints: [
          { text: "√2 ≈ 1,41421...", malus: 1 },
          { text: "Parmi les quatre intervalles proposés, lequel contient 1,41421... ?", malus: 1 },
        ],
        solution: "[1,4 ; 1,5]",
        explanation: "√2 ≈ 1,41421..., qui appartient bien à l'intervalle [1,4 ; 1,5].",
      },
      {
        type: "NUMERIC",
        statement: "Pour le vérifier par le calcul, calcule 1,4² (1,4 au carré).",
        points: 2,
        difficulty: 1,
        data: { value: 1.96, tolerance: 0.001 },
        hints: [
          { text: "1,4² = 1,4 × 1,4.", malus: 1 },
          { text: "14 × 14 = 196, puis place la virgule.", malus: 1 },
        ],
        solution: "1,96",
        explanation: "1,4² = 1,4 × 1,4 = 1,96.",
      },
      {
        type: "NUMERIC",
        statement: "Calcule maintenant 1,5² (1,5 au carré).",
        points: 3,
        difficulty: 2,
        data: { value: 2.25, tolerance: 0.001 },
        hints: [
          { text: "1,5² = 1,5 × 1,5.", malus: 1 },
          { text: "15 × 15 = 225, puis place la virgule.", malus: 1 },
        ],
        solution: "2,25",
        explanation:
          "1,5² = 2,25. Comme 1,96 < 2 < 2,25, c'est-à-dire 1,4² < 2 < 1,5², on retrouve bien 1,4 < √2 < 1,5.",
      },
      {
        type: "QCM",
        statement: "Le nombre 1/3 est-il un nombre décimal ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Non, son écriture décimale 0,333... est illimitée",
            "Oui, 1/3 = 0,3",
            "Oui, car 3 est un entier",
            "Non, car 1/3 est négatif",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un nombre décimal a une écriture décimale limitée (un nombre fini de chiffres après la virgule).", malus: 1 },
          { text: "Effectue la division 1 ÷ 3 : le reste se répète-t-il indéfiniment ?", malus: 1 },
        ],
        solution: "Non, son écriture décimale 0,333... est illimitée",
        explanation:
          "1/3 = 0,3333... : son écriture décimale ne s'arrête jamais. Le nombre rationnel 1/3 n'est donc pas décimal, bien qu'il soit rationnel.",
      },
      {
        type: "NUMERIC",
        statement: "En sachant que π ≈ 3,14159..., donne l'arrondi de π au centième (à 10⁻² près).",
        points: 4,
        difficulty: 3,
        data: { value: 3.14, tolerance: 0.001 },
        hints: [
          { text: "Arrondir au centième, c'est garder deux chiffres après la virgule.", malus: 1 },
          { text: "Regarde le troisième chiffre après la virgule (1) pour savoir si on arrondit au-dessus ou en dessous.", malus: 1 },
        ],
        solution: "3,14",
        explanation:
          "π ≈ 3,14159... Le chiffre des millièmes est 1 (inférieur à 5), on arrondit donc à 3,14.",
      },
      {
        type: "TEXT",
        statement: "π est-il un nombre rationnel ou irrationnel ? Réponds par \"rationnel\" ou \"irrationnel\".",
        points: 4,
        difficulty: 3,
        data: { accepted: ["irrationnel"] },
        hints: [
          { text: "Un nombre irrationnel ne peut pas s'écrire comme un quotient de deux entiers.", malus: 1 },
          { text: "Comme √2, π est un exemple classique de nombre irrationnel fourni par la géométrie.", malus: 1 },
        ],
        solution: "irrationnel",
        explanation:
          "π ne peut pas s'écrire sous la forme d'une fraction d'entiers : c'est un nombre irrationnel, tout comme √2.",
      },
    ],
  },
  {
    slug: "temperatures-et-intervalles",
    title: "Températures et intervalles",
    difficulty: 2,
    intro:
      "Une station météorologique enregistre une température x (en °C) qui vérifie −5 ⩽ x < 8.",
    questions: [
      {
        type: "QCM",
        statement: "Comment note-t-on l'intervalle des températures possibles ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["[−5 ; 8[", "]−5 ; 8]", "[−5 ; 8]", "]−5 ; 8["],
          correctIndex: 0,
        },
        hints: [
          { text: "Un crochet fermé [ correspond à une inégalité large (⩽ ou ⩾) ; un crochet ouvert ] correspond à une inégalité stricte (< ou >).", malus: 1 },
          { text: "Ici, −5 ⩽ x (large) et x < 8 (stricte).", malus: 1 },
        ],
        solution: "[−5 ; 8[",
        explanation:
          "L'inégalité −5 ⩽ x est large : on utilise un crochet fermé en −5. L'inégalité x < 8 est stricte : on utilise un crochet ouvert en 8. L'intervalle est donc [−5 ; 8[.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'amplitude de l'intervalle [−5 ; 8[ ?",
        points: 2,
        difficulty: 1,
        data: { value: 13, tolerance: 0 },
        hints: [
          { text: "L'amplitude d'un intervalle [a ; b[ est b − a.", malus: 1 },
          { text: "Calcule 8 − (−5).", malus: 1 },
        ],
        solution: "13",
        explanation: "8 − (−5) = 8 + 5 = 13.",
      },
      {
        type: "QCM",
        statement: "La valeur −5 appartient-elle à l'intervalle [−5 ; 8[ ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Oui, car le crochet en −5 est fermé",
            "Non, car −5 est négatif",
            "Oui, car −5 est un entier",
            "Non, car le crochet en −5 est ouvert",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Regarde le type de crochet utilisé du côté de −5 dans la notation [−5 ; 8[.", malus: 1 },
          { text: "Un crochet fermé signifie que la borne fait partie de l'intervalle.", malus: 1 },
        ],
        solution: "Oui, car le crochet en −5 est fermé",
        explanation: "Le crochet en −5 est fermé ([), donc −5 appartient bien à l'intervalle.",
      },
      {
        type: "QCM",
        statement: "La valeur 8 appartient-elle à l'intervalle [−5 ; 8[ ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Non, car le crochet en 8 est ouvert",
            "Oui, car 8 est la borne supérieure",
            "Non, car 8 est positif",
            "Oui, car le crochet en 8 est fermé",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Regarde le type de crochet utilisé du côté de 8 dans la notation [−5 ; 8[.", malus: 1 },
          { text: "Un crochet ouvert signifie que la borne ne fait pas partie de l'intervalle.", malus: 1 },
        ],
        solution: "Non, car le crochet en 8 est ouvert",
        explanation: "Le crochet en 8 est ouvert ([), donc 8 n'appartient pas à l'intervalle : x reste strictement inférieur à 8.",
      },
      {
        type: "NUMERIC",
        statement:
          "On veut que x vérifie |x − 10| ⩽ 4. Quelle est la plus petite valeur possible de x ?",
        points: 4,
        difficulty: 3,
        data: { value: 6, tolerance: 0 },
        hints: [
          { text: "|x − 10| ⩽ 4 équivaut à 10 − 4 ⩽ x ⩽ 10 + 4.", malus: 1 },
          { text: "Calcule 10 − 4.", malus: 1 },
        ],
        solution: "6",
        explanation: "|x − 10| ⩽ 4 équivaut à 6 ⩽ x ⩽ 14. La plus petite valeur possible est donc 6.",
      },
      {
        type: "NUMERIC",
        statement: "Toujours avec |x − 10| ⩽ 4, quelle est la plus grande valeur possible de x ?",
        points: 4,
        difficulty: 3,
        data: { value: 14, tolerance: 0 },
        hints: [
          { text: "Reprends l'encadrement 6 ⩽ x ⩽ 14 trouvé à la question précédente.", malus: 1 },
          { text: "Calcule 10 + 4.", malus: 1 },
        ],
        solution: "14",
        explanation: "10 + 4 = 14 : la plus grande valeur possible de x est 14.",
      },
    ],
  },
];
