import type { SeedProblem } from "./types";

export const arithmetiqueProblems: SeedProblem[] = [
  {
    slug: "rangement-de-bulbes",
    title: "Le rangement des bulbes de tulipes",
    difficulty: 2,
    showCalculator: true,
    intro:
      "Un jardinier dispose de 84 bulbes de tulipes et de 126 bulbes de jonquilles. Il veut former des rangées toutes identiques (même nombre de tulipes et même nombre de jonquilles par rangée), en utilisant tous les bulbes, avec le plus grand nombre de rangées possible.",
    questions: [
      {
        type: "QCM",
        statement: "84 est-il un multiple de 7 ?",
        points: 2,
        difficulty: 1,
        data: {
          options: [
            "Oui, car 84 = 12 × 7",
            "Non, car 84 n'est pas divisible par 7",
            "Oui, car 84 est un nombre pair",
            "On ne peut pas savoir sans poser la division",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un nombre a est multiple de b s'il existe un entier k tel que a = k × b.", malus: 1 },
          { text: "Essaie de compléter : 84 = 7 × … ", malus: 1 },
        ],
        solution: "Oui, car 84 = 12 × 7",
        explanation:
          "84 = 7 × 12. Il existe bien un entier k (ici k = 12) tel que 84 = 7 × k, donc 84 est un multiple de 7.",
      },
      {
        type: "QCM",
        statement: "126 est-il pair ou impair ?",
        points: 2,
        difficulty: 1,
        data: {
          options: [
            "Pair, car 126 = 2 × 63",
            "Impair, car 126 ne se termine pas par un chiffre pair",
            "Pair, car 126 est un multiple de 7",
            "Impair, car la somme de ses chiffres est impaire",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un nombre pair s'écrit sous la forme 2k, avec k entier.", malus: 1 },
          { text: "126 = 2 × 63 : cette écriture confirme la parité.", malus: 1 },
        ],
        solution: "Pair, car 126 = 2 × 63",
        explanation:
          "126 = 2 × 63. Comme 126 s'écrit sous la forme 2k avec k = 63 entier, 126 est pair.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quel est le plus grand nombre de rangées identiques que le jardinier peut former, en utilisant tous les bulbes de tulipes et tous les bulbes de jonquilles ?",
        points: 3,
        difficulty: 2,
        data: { value: 42, tolerance: 0 },
        hints: [
          {
            text: "Liste les diviseurs de 84, puis les diviseurs de 126, et repère ceux qu'ils ont en commun.",
            malus: 1,
          },
          {
            text: "Les diviseurs communs à 84 et 126 sont 1, 2, 3, 6, 7, 14, 21 et 42. Le plus grand nombre de rangées est le plus grand d'entre eux.",
            malus: 1,
          },
        ],
        solution: "42",
        explanation:
          "Diviseurs de 84 : 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84. Diviseurs de 126 : 1, 2, 3, 6, 7, 9, 14, 18, 21, 42, 63, 126. Le plus grand diviseur commun est 42 : le jardinier peut former 42 rangées identiques.",
      },
      {
        type: "NUMERIC",
        statement: "Avec 42 rangées, combien de bulbes de tulipes y a-t-il dans chaque rangée ?",
        points: 3,
        difficulty: 2,
        data: { value: 2, tolerance: 0 },
        hints: [
          { text: "Divise le nombre total de bulbes de tulipes par le nombre de rangées.", malus: 1 },
          { text: "Calcule 84 ÷ 42.", malus: 1 },
        ],
        solution: "2",
        explanation: "84 ÷ 42 = 2 : chaque rangée contient 2 bulbes de tulipes.",
      },
      {
        type: "TEXT",
        statement:
          "Quelle fraction irréductible du nombre total de bulbes (tulipes + jonquilles) représentent les bulbes de tulipes ? Réponds sous la forme a/b.",
        points: 4,
        difficulty: 3,
        data: { accepted: ["2/5"] },
        hints: [
          { text: "Le nombre total de bulbes est 84 + 126 = 210. La fraction cherchée est 84/210.", malus: 1 },
          {
            text: "Simplifie 84/210 en divisant le numérateur et le dénominateur par leur plus grand diviseur commun, 42.",
            malus: 1,
          },
        ],
        solution: "2/5",
        explanation:
          "Il y a 84 + 126 = 210 bulbes en tout. La fraction de tulipes est 84/210. Comme 84 = 42 × 2 et 210 = 42 × 5, on simplifie : 84/210 = 2/5. Cette fraction est irréductible car 2 et 5 n'ont aucun diviseur commun autre que 1.",
      },
      {
        type: "NUMERIC",
        statement:
          "Le jardinier achète 14 bulbes de jonquilles supplémentaires : il en a donc désormais 126 + 14 = 140. Comme 126 est un multiple de 7 (126 = 18 × 7) et 14 est un multiple de 7 (14 = 2 × 7), leur somme 140 est aussi un multiple de 7. Quel est le quotient 140 ÷ 7 ?",
        points: 4,
        difficulty: 3,
        data: { value: 20, tolerance: 0 },
        hints: [
          {
            text: "La somme de deux multiples de 7 est un multiple de 7 : 126 + 14 = 7 × 18 + 7 × 2 = 7 × (18 + 2).",
            malus: 1,
          },
          { text: "Calcule 18 + 2, puis vérifie que 7 × (18 + 2) = 140.", malus: 1 },
        ],
        solution: "20",
        explanation:
          "Propriété générale : pour une valeur numérique de a, la somme de deux multiples de a est multiple de a. Ici 126 = 7 × 18 et 14 = 7 × 2, donc 126 + 14 = 7 × 18 + 7 × 2 = 7 × (18 + 2) = 7 × 20 = 140. Le quotient 140 ÷ 7 est donc 20.",
      },
    ],
  },
  {
    slug: "codes-et-parite",
    title: "Codes salariés et parité",
    difficulty: 2,
    showCalculator: true,
    intro:
      "Une entreprise attribue à chaque salarié un code composé d'un nombre entier. Certaines règles internes de validation reposent sur la parité (pair/impair) de ce nombre.",
    questions: [
      {
        type: "QCM",
        statement: "Un entier n est impair si, et seulement si :",
        points: 2,
        difficulty: 1,
        data: {
          options: [
            "il existe un entier k tel que n = 2k + 1",
            "il existe un entier k tel que n = 2k",
            "il existe un entier k tel que n = k + 1",
            "n n'est pas un nombre entier",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Un nombre pair s'écrit 2k. Un nombre impair s'écrit \"2k et encore 1 de plus\".", malus: 1 },
          { text: "Teste avec n = 7 : existe-t-il k tel que 7 = 2k + 1 ?", malus: 1 },
        ],
        solution: "il existe un entier k tel que n = 2k + 1",
        explanation:
          "Par définition, un entier est impair lorsqu'il existe un entier k tel que n = 2k + 1 (par exemple 7 = 2 × 3 + 1).",
      },
      {
        type: "NUMERIC",
        statement: "Le code d'un salarié est n = 57. Donne l'entier k tel que 57 = 2k + 1.",
        points: 2,
        difficulty: 1,
        data: { value: 28, tolerance: 0 },
        hints: [
          { text: "Soustrais 1 à 57, puis divise le résultat par 2.", malus: 1 },
          { text: "57 − 1 = 56, et 56 ÷ 2 = …", malus: 1 },
        ],
        solution: "28",
        explanation: "57 = 2k + 1 donne 2k = 56, donc k = 28. Vérification : 2 × 28 + 1 = 57.",
      },
      {
        type: "QCM",
        statement: "Le carré de 57, soit 3249, est-il pair ou impair ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Impair, car le carré d'un nombre impair est impair",
            "Pair, car 57 est impair",
            "Impair, car 57 est un multiple de 3",
            "On ne peut pas savoir sans poser le calcul",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Il existe un résultat général sur le carré d'un nombre impair.", malus: 1 },
          {
            text: "Si n = 2k + 1, alors n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, qui est de la forme \"2 × entier + 1\".",
            malus: 1,
          },
        ],
        solution: "Impair, car le carré d'un nombre impair est impair",
        explanation:
          "Propriété du programme : le carré d'un nombre impair est impair. En effet, si n = 2k + 1, alors n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, qui est bien impair. C'est le cas de 57² = 3249.",
      },
      {
        type: "NUMERIC",
        statement:
          "Un code doit être à la fois pair et multiple de 9. Quel est le plus petit code strictement positif possible ?",
        points: 3,
        difficulty: 2,
        data: { value: 18, tolerance: 0 },
        hints: [
          { text: "Liste les premiers multiples de 9 : 9, 18, 27, 36, …", malus: 1 },
          { text: "Parmi ces multiples de 9, lequel est le premier à être pair ?", malus: 1 },
        ],
        solution: "18",
        explanation:
          "Les multiples de 9 sont 9, 18, 27, 36, … Le premier qui est pair est 18 (= 2 × 9). C'est donc le plus petit code possible.",
      },
      {
        type: "TEXT",
        statement:
          "On considère deux codes pairs a et b (chacun multiple de 2). Sans calculer de valeurs précises, quelle est la parité de a + b ? Réponds par \"pair\" ou \"impair\".",
        points: 4,
        difficulty: 3,
        data: { accepted: ["pair"] },
        hints: [
          { text: "Écris a = 2k et b = 2k' avec k et k' entiers, puis calcule a + b.", malus: 1 },
          { text: "a + b = 2k + 2k' = 2(k + k') : reconnais-tu la forme d'un nombre pair ?", malus: 1 },
        ],
        solution: "pair",
        explanation:
          "Si a = 2k et b = 2k' avec k et k' entiers, alors a + b = 2k + 2k' = 2(k + k'). Comme k + k' est un entier, a + b est bien de la forme 2 × entier : la somme de deux nombres pairs est toujours paire.",
      },
      {
        type: "NUMERIC",
        statement:
          "Deux codes a = 124 et b = 578 sont pairs. Calcule a + b, puis donne le quotient (a + b) ÷ 2 pour vérifier que la somme est bien un multiple de 2.",
        points: 4,
        difficulty: 3,
        data: { value: 351, tolerance: 0 },
        hints: [
          { text: "Calcule d'abord a + b = 124 + 578.", malus: 1 },
          { text: "Une fois la somme obtenue, divise-la par 2.", malus: 1 },
        ],
        solution: "351",
        explanation: "a + b = 124 + 578 = 702. Puis 702 ÷ 2 = 351, un entier : 702 est bien pair.",
      },
    ],
  },
  {
    slug: "partage-de-fournitures",
    title: "Partage d'un stock de fournitures",
    difficulty: 2,
    intro:
      "Une association reçoit un don de 108 cahiers et 72 stylos. Elle souhaite composer des lots identiques (même nombre de cahiers et même nombre de stylos par lot), sans qu'il ne reste de fournitures, en formant le plus de lots possible.",
    questions: [
      {
        type: "QCM",
        statement: "72 est-il un diviseur de 108 ?",
        points: 2,
        difficulty: 1,
        data: {
          options: [
            "Non, car 108 n'est pas un multiple de 72",
            "Oui, car 108 = 72 × 1,5",
            "Oui, car 72 est pair",
            "Non, car 72 est un nombre impair",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "72 est un diviseur de 108 si 108 est un multiple de 72, c'est-à-dire si 108 ÷ 72 est un entier.", malus: 1 },
          { text: "Calcule 108 ÷ 72 : obtiens-tu un nombre entier ?", malus: 1 },
        ],
        solution: "Non, car 108 n'est pas un multiple de 72",
        explanation:
          "108 ÷ 72 = 1,5, qui n'est pas un entier. Il n'existe donc pas d'entier k tel que 108 = 72 × k : 72 n'est pas un diviseur de 108.",
      },
      {
        type: "NUMERIC",
        statement: "On écrit 108 sous la forme 108 = 4 × k, avec k entier. Quelle est la valeur de k ?",
        points: 2,
        difficulty: 1,
        data: { value: 27, tolerance: 0 },
        hints: [
          { text: "Divise 108 par 4.", malus: 1 },
          { text: "4 × 27 = 108 : vérifie ce calcul.", malus: 1 },
        ],
        solution: "27",
        explanation: "108 ÷ 4 = 27, donc 108 = 4 × 27.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quel est le plus grand nombre de lots identiques que l'on peut former avec les 108 cahiers et les 72 stylos ?",
        points: 3,
        difficulty: 2,
        data: { value: 36, tolerance: 0 },
        hints: [
          { text: "Liste les diviseurs de 108, puis ceux de 72, et repère les diviseurs communs.", malus: 1 },
          {
            text: "Les diviseurs communs à 108 et 72 sont 1, 2, 3, 4, 6, 9, 12, 18 et 36. Le nombre de lots est le plus grand d'entre eux.",
            malus: 1,
          },
        ],
        solution: "36",
        explanation:
          "Diviseurs de 108 : 1, 2, 3, 4, 6, 9, 12, 18, 27, 36, 54, 108. Diviseurs de 72 : 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. Le plus grand diviseur commun est 36 : on peut former 36 lots identiques.",
      },
      {
        type: "NUMERIC",
        statement: "Avec 36 lots, combien de cahiers contient chaque lot ?",
        points: 3,
        difficulty: 2,
        data: { value: 3, tolerance: 0 },
        hints: [
          { text: "Divise le nombre total de cahiers par le nombre de lots.", malus: 1 },
          { text: "Calcule 108 ÷ 36.", malus: 1 },
        ],
        solution: "3",
        explanation: "108 ÷ 36 = 3 : chaque lot contient 3 cahiers.",
      },
      {
        type: "TEXT",
        statement:
          "Quelle fraction irréductible du total des fournitures (108 cahiers + 72 stylos) représentent les stylos ? Réponds sous la forme a/b.",
        points: 4,
        difficulty: 3,
        data: { accepted: ["2/5"] },
        hints: [
          { text: "Le total des fournitures est 108 + 72 = 180. La fraction cherchée est 72/180.", malus: 1 },
          { text: "Simplifie 72/180 en divisant numérateur et dénominateur par leur plus grand diviseur commun, 36.", malus: 1 },
        ],
        solution: "2/5",
        explanation:
          "Total : 108 + 72 = 180 fournitures. La fraction de stylos est 72/180. Comme 72 = 36 × 2 et 180 = 36 × 5, on obtient 72/180 = 2/5, une fraction irréductible.",
      },
      {
        type: "NUMERIC",
        statement:
          "L'association reçoit encore 144 crayons, qu'elle veut répartir également entre les 36 lots déjà formés. Combien de crayons y aura-t-il dans chaque lot ?",
        points: 4,
        difficulty: 3,
        data: { value: 4, tolerance: 0 },
        hints: [
          { text: "144 est-il un multiple de 36 ? Vérifie en écrivant 144 = 36 × k.", malus: 1 },
          { text: "Divise 144 par 36.", malus: 1 },
        ],
        solution: "4",
        explanation:
          "144 = 36 × 4 : 144 est bien un multiple de 36, donc la répartition est possible sans reste. Chaque lot reçoit 144 ÷ 36 = 4 crayons.",
      },
    ],
  },
];
