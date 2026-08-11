import type { SeedProblem } from "./types";

export const probabilitesProblems: SeedProblem[] = [
  {
    slug: "tirage-de-boules-dans-un-sac",
    title: "Tirage de boules dans un sac",
    difficulty: 2,
    intro:
      "Un sac contient 20 boules indiscernables au toucher : 8 rouges, 5 vertes et 7 bleues. On tire une boule au hasard.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer une boule rouge ?",
        points: 2,
        difficulty: 1,
        data: { value: 0.4, tolerance: 0.001 },
        hints: [
          { text: "En situation d'équiprobabilité, P(A) = Card(A) / Card(Ω).", malus: 1 },
          { text: "Calcule 8 / 20.", malus: 1 },
        ],
        solution: "0,4",
        explanation: "P(rouge) = 8 / 20 = 0,4.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer une boule verte ?",
        points: 2,
        difficulty: 1,
        data: { value: 0.25, tolerance: 0.001 },
        hints: [
          { text: "P(A) = Card(A) / Card(Ω).", malus: 1 },
          { text: "Calcule 5 / 20.", malus: 1 },
        ],
        solution: "0,25",
        explanation: "P(verte) = 5 / 20 = 0,25.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer une boule bleue ?",
        points: 3,
        difficulty: 2,
        data: { value: 0.35, tolerance: 0.001 },
        hints: [
          { text: "P(A) = Card(A) / Card(Ω).", malus: 1 },
          { text: "Calcule 7 / 20.", malus: 1 },
        ],
        solution: "0,35",
        explanation: "P(bleue) = 7 / 20 = 0,35.",
      },
      {
        type: "NUMERIC",
        statement:
          "Quelle est la probabilité de l'évènement contraire de \"tirer une boule rouge\" (tirer une boule qui n'est pas rouge) ?",
        points: 3,
        difficulty: 2,
        data: { value: 0.6, tolerance: 0.001 },
        hints: [
          { text: "La probabilité de l'évènement contraire de A est 1 − P(A).", malus: 1 },
          { text: "Calcule 1 − 0,4.", malus: 1 },
        ],
        solution: "0,6",
        explanation: "P(non rouge) = 1 − P(rouge) = 1 − 0,4 = 0,6.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer une boule rouge ou verte ?",
        points: 4,
        difficulty: 3,
        data: { value: 0.65, tolerance: 0.001 },
        hints: [
          { text: "Une boule ne peut pas être à la fois rouge et verte : ce sont des issues incompatibles.", malus: 1 },
          { text: "La probabilité d'un évènement est la somme des probabilités des issues qui le composent : additionne P(rouge) et P(verte).", malus: 1 },
        ],
        solution: "0,65",
        explanation: "P(rouge ou verte) = P(rouge) + P(verte) = 0,4 + 0,25 = 0,65.",
      },
      {
        type: "QCM",
        statement:
          "Les évènements \"tirer une boule rouge\" et \"tirer une boule bleue\" sont-ils incompatibles (ne peuvent pas se produire en même temps lors d'un même tirage) ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Oui, une boule tirée ne peut avoir qu'une seule couleur à la fois",
            "Non, cela dépend du tirage",
            "Oui, mais seulement si le sac contient plus de 20 boules",
            "Non, ces évènements sont toujours compatibles",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "On tire une seule boule à chaque fois.", malus: 1 },
          { text: "Une boule a une seule couleur : elle ne peut pas être à la fois rouge et bleue.", malus: 1 },
        ],
        solution: "Oui, une boule tirée ne peut avoir qu'une seule couleur à la fois",
        explanation:
          "Comme on tire une seule boule, qui n'a qu'une seule couleur, les évènements \"rouge\" et \"bleue\" ne peuvent jamais se produire simultanément : ils sont incompatibles.",
      },
    ],
  },
  {
    slug: "arbre-pondere-et-jetons",
    title: "Arbre pondéré : jetons rouges et bleus",
    difficulty: 2,
    intro:
      "Une urne contient des jetons rouges (60 % de l'urne) et des jetons bleus (40 % de l'urne). Parmi les jetons rouges, 25 % sont marqués d'une étoile. Parmi les jetons bleus, 50 % sont marqués d'une étoile. On tire un jeton au hasard.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer un jeton rouge, P(Rouge) ?",
        points: 2,
        difficulty: 1,
        data: { value: 0.6, tolerance: 0.001 },
        hints: [
          { text: "Cette information est donnée directement dans l'énoncé.", malus: 1 },
          { text: "60 % s'écrit 0,6 en écriture décimale.", malus: 1 },
        ],
        solution: "0,6",
        explanation: "L'énoncé indique que 60 % des jetons sont rouges, donc P(Rouge) = 0,6.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la probabilité de tirer un jeton bleu, P(Bleu) ?",
        points: 2,
        difficulty: 1,
        data: { value: 0.4, tolerance: 0.001 },
        hints: [
          { text: "Les jetons sont soit rouges, soit bleus.", malus: 1 },
          { text: "Calcule 1 − 0,6, ou relis directement l'énoncé.", malus: 1 },
        ],
        solution: "0,4",
        explanation: "40 % des jetons sont bleus, donc P(Bleu) = 0,4 (et on vérifie 0,6 + 0,4 = 1).",
      },
      {
        type: "NUMERIC",
        statement:
          "Sachant que le jeton tiré est rouge, quelle est la probabilité qu'il soit marqué d'une étoile, notée P_Rouge(Étoile) ?",
        points: 3,
        difficulty: 2,
        data: { value: 0.25, tolerance: 0.001 },
        hints: [
          { text: "Cette probabilité conditionnelle est donnée directement dans l'énoncé.", malus: 1 },
          { text: "25 % s'écrit 0,25 en écriture décimale.", malus: 1 },
        ],
        solution: "0,25",
        explanation: "L'énoncé indique que 25 % des jetons rouges portent une étoile : P_Rouge(Étoile) = 0,25.",
      },
      {
        type: "NUMERIC",
        statement:
          "En utilisant la règle du produit le long des branches de l'arbre, quelle est la probabilité de tirer un jeton rouge ET marqué d'une étoile ? (P(Rouge) × P_Rouge(Étoile))",
        points: 3,
        difficulty: 2,
        data: { value: 0.15, tolerance: 0.001 },
        hints: [
          { text: "Multiplie les probabilités portées par les deux branches successives : d'abord \"Rouge\", puis \"Étoile sachant Rouge\".", malus: 1 },
          { text: "Calcule 0,6 × 0,25.", malus: 1 },
        ],
        solution: "0,15",
        explanation: "P(Rouge et Étoile) = P(Rouge) × P_Rouge(Étoile) = 0,6 × 0,25 = 0,15.",
      },
      {
        type: "NUMERIC",
        statement:
          "De même, sachant que P_Bleu(Étoile) = 0,5, quelle est la probabilité de tirer un jeton bleu ET marqué d'une étoile ?",
        points: 4,
        difficulty: 3,
        data: { value: 0.2, tolerance: 0.001 },
        hints: [
          { text: "Multiplie P(Bleu) par P_Bleu(Étoile).", malus: 1 },
          { text: "Calcule 0,4 × 0,5.", malus: 1 },
        ],
        solution: "0,2",
        explanation: "P(Bleu et Étoile) = P(Bleu) × P_Bleu(Étoile) = 0,4 × 0,5 = 0,2.",
      },
      {
        type: "NUMERIC",
        statement:
          "En additionnant les deux résultats précédents (0,15 + 0,2), quelle est la probabilité totale de tirer un jeton marqué d'une étoile ?",
        points: 4,
        difficulty: 3,
        data: { value: 0.35, tolerance: 0.001 },
        hints: [
          { text: "Un jeton étoilé est soit rouge et étoilé, soit bleu et étoilé : ces deux chemins de l'arbre sont incompatibles.", malus: 1 },
          { text: "Additionne les probabilités des deux chemins qui mènent à \"Étoile\".", malus: 1 },
        ],
        solution: "0,35",
        explanation:
          "P(Étoile) = P(Rouge et Étoile) + P(Bleu et Étoile) = 0,15 + 0,2 = 0,35 : on additionne les probabilités de tous les chemins de l'arbre menant à l'évènement \"Étoile\".",
      },
    ],
  },
  {
    slug: "test-de-depistage-et-faux-positifs",
    title: "Test de dépistage et faux positifs",
    difficulty: 3,
    intro:
      "Dans une population, une maladie touche 2 % des individus. Un test de dépistage est positif pour 90 % des personnes malades, mais aussi positif pour 5 % des personnes non malades (on parle alors de faux positif). On étudie un échantillon de 1000 personnes.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Sur 1000 personnes, combien sont malades (2 % de la population) ?",
        points: 2,
        difficulty: 1,
        data: { value: 20, tolerance: 0 },
        hints: [
          { text: "Calcule 2 % de 1000.", malus: 1 },
          { text: "2 % de 1000, c'est 1000 × 0,02.", malus: 1 },
        ],
        solution: "20",
        explanation: "1000 × 0,02 = 20 personnes malades.",
      },
      {
        type: "NUMERIC",
        statement: "Sur 1000 personnes, combien ne sont pas malades ?",
        points: 2,
        difficulty: 1,
        data: { value: 980, tolerance: 0 },
        hints: [
          { text: "Chaque personne est soit malade, soit non malade.", malus: 1 },
          { text: "Calcule 1000 − 20.", malus: 1 },
        ],
        solution: "980",
        explanation: "1000 − 20 = 980 personnes non malades.",
      },
      {
        type: "NUMERIC",
        statement: "Parmi les 20 personnes malades, combien ont un test positif (90 % d'entre elles) ?",
        points: 3,
        difficulty: 2,
        data: { value: 18, tolerance: 0 },
        hints: [
          { text: "Calcule 90 % de 20.", malus: 1 },
          { text: "20 × 0,9.", malus: 1 },
        ],
        solution: "18",
        explanation: "20 × 0,9 = 18 personnes malades ont un test positif (vrais positifs).",
      },
      {
        type: "NUMERIC",
        statement:
          "Parmi les 980 personnes non malades, combien ont tout de même un test positif (un faux positif), sachant que cela concerne 5 % d'entre elles ?",
        points: 3,
        difficulty: 2,
        data: { value: 49, tolerance: 0 },
        hints: [
          { text: "Calcule 5 % de 980.", malus: 1 },
          { text: "980 × 0,05.", malus: 1 },
        ],
        solution: "49",
        explanation: "980 × 0,05 = 49 faux positifs parmi les personnes non malades.",
      },
      {
        type: "NUMERIC",
        statement: "Quel est le nombre total de tests positifs (malades et non malades confondus) sur les 1000 personnes ?",
        points: 4,
        difficulty: 3,
        data: { value: 67, tolerance: 0 },
        hints: [
          { text: "Additionne les vrais positifs et les faux positifs.", malus: 1 },
          { text: "Calcule 18 + 49.", malus: 1 },
        ],
        solution: "67",
        explanation: "18 + 49 = 67 tests positifs au total.",
      },
      {
        type: "QCM",
        statement:
          "On sait que P(test positif sachant malade) = 90 %. Cette probabilité est-elle égale à P(malade sachant test positif) ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "Non, ce sont deux probabilités différentes (18/67 ≈ 27 % contre 90 %)",
            "Oui, ces deux probabilités sont toujours égales",
            "Non, mais on ne peut pas savoir laquelle est la plus grande",
            "Oui, car la maladie est rare",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "P(malade sachant positif) se calcule parmi les 67 personnes dont le test est positif.", malus: 1 },
          { text: "Sur les 67 tests positifs, seules 18 personnes sont réellement malades : calcule 18 / 67.", malus: 1 },
        ],
        solution: "Non, ce sont deux probabilités différentes (18/67 ≈ 27 % contre 90 %)",
        explanation:
          "P(positif sachant malade) = 90 % est très différent de P(malade sachant positif) = 18/67 ≈ 27 %. Comme la maladie est rare, la plupart des tests positifs sont en réalité des faux positifs : il ne faut jamais confondre PA(B) et PB(A).",
      },
    ],
  },
];
