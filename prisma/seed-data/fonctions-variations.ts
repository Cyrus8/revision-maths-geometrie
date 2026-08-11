import type { SeedProblem } from "./types";

export const fonctionsVariationsProblems: SeedProblem[] = [
  {
    slug: "optimisation-d-un-enclos",
    title: "Optimiser l'aire d'un enclos rectangulaire",
    difficulty: 2,
    intro:
      "Un agriculteur dispose de 40 m de clôture pour délimiter un enclos rectangulaire. Si x désigne la longueur d'un côté (en m, avec 0 < x < 20), l'autre côté mesure (20 − x) et l'aire de l'enclos est A(x) = x(20 − x).",
    questions: [
      {
        type: "NUMERIC",
        statement: "Calcule A(5), l'aire pour x = 5 m.",
        points: 2,
        difficulty: 1,
        data: { value: 75, tolerance: 0 },
        hints: [
          { text: "Remplace x par 5 dans A(x) = x(20 − x).", malus: 1 },
          { text: "Calcule 5 × (20 − 5).", malus: 1 },
        ],
        solution: "75",
        explanation: "A(5) = 5 × (20 − 5) = 5 × 15 = 75 m².",
      },
      {
        type: "NUMERIC",
        statement: "Calcule A(10), l'aire pour x = 10 m.",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "Remplace x par 10 dans A(x) = x(20 − x).", malus: 1 },
          { text: "Calcule 10 × (20 − 10).", malus: 1 },
        ],
        solution: "100",
        explanation: "A(10) = 10 × (20 − 10) = 10 × 10 = 100 m².",
      },
      {
        type: "NUMERIC",
        statement: "Calcule A(15), l'aire pour x = 15 m.",
        points: 3,
        difficulty: 2,
        data: { value: 75, tolerance: 0 },
        hints: [
          { text: "Remplace x par 15 dans A(x) = x(20 − x).", malus: 1 },
          { text: "Calcule 15 × (20 − 15).", malus: 1 },
        ],
        solution: "75",
        explanation: "A(15) = 15 × (20 − 15) = 15 × 5 = 75 m².",
      },
      {
        type: "QCM",
        statement: "En comparant A(5), A(10) et A(15), que peut-on observer autour de x = 10 ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "L'aire semble maximale en x = 10",
            "L'aire semble minimale en x = 10",
            "L'aire est constante",
            "L'aire est toujours croissante",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Compare les trois valeurs trouvées : 75, 100 et 75.", malus: 1 },
          { text: "La plus grande des trois valeurs est atteinte pour quelle valeur de x ?", malus: 1 },
        ],
        solution: "L'aire semble maximale en x = 10",
        explanation: "A(5) = 75, A(10) = 100 et A(15) = 75 : l'aire est plus grande en x = 10 qu'aux alentours, ce qui suggère un maximum en x = 10.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est la valeur maximale de l'aire A(x) pour 0 < x < 20 ?",
        points: 4,
        difficulty: 3,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "A(x) = x(20 − x) = −x² + 20x = −(x − 10)² + 100.", malus: 1 },
          { text: "Le terme −(x − 10)² est toujours négatif ou nul : quelle est alors la plus grande valeur possible de A(x) ?", malus: 1 },
        ],
        solution: "100",
        explanation:
          "En écrivant A(x) = −(x − 10)² + 100, on voit que A(x) est maximale quand −(x − 10)² vaut 0, c'est-à-dire quand x = 10. La valeur maximale est alors 100 m² : c'est l'enclos carré qui maximise l'aire.",
      },
      {
        type: "NUMERIC",
        statement: "Pour quelle valeur de x cette aire maximale est-elle atteinte ?",
        points: 4,
        difficulty: 3,
        data: { value: 10, tolerance: 0 },
        hints: [
          { text: "Reprends l'écriture A(x) = −(x − 10)² + 100.", malus: 1 },
          { text: "Le carré (x − 10)² s'annule pour quelle valeur de x ?", malus: 1 },
        ],
        solution: "10",
        explanation: "Le maximum est atteint quand (x − 10)² = 0, c'est-à-dire quand x = 10 : l'enclos optimal est un carré de 10 m de côté.",
      },
    ],
  },
  {
    slug: "altitude-d-un-parcours-cycliste",
    title: "Lire un tableau de variations : l'altitude d'un parcours cycliste",
    difficulty: 2,
    intro:
      "Un cycliste roule sur un parcours vallonné. La distance parcourue depuis le départ est notée x (en km, 0 ⩽ x ⩽ 12) et son altitude f(x) (en m) suit ces variations : f est croissante sur [0 ; 4], décroissante sur [4 ; 9], puis croissante sur [9 ; 12], avec f(0) = 100, f(4) = 300, f(9) = 150 et f(12) = 220.",
    questions: [
      {
        type: "QCM",
        statement: "Sur quel intervalle f est-elle croissante en tout premier, en partant du départ ?",
        points: 2,
        difficulty: 1,
        data: {
          options: ["[0 ; 4]", "[4 ; 9]", "[9 ; 12]", "[0 ; 12]"],
          correctIndex: 0,
        },
        hints: [
          { text: "Relis l'énoncé : sur quel premier intervalle f est-elle dite croissante ?", malus: 1 },
          { text: "C'est le tout début du parcours, entre x = 0 et x = 4.", malus: 1 },
        ],
        solution: "[0 ; 4]",
        explanation: "D'après l'énoncé, f est croissante sur [0 ; 4], le premier tronçon du parcours.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'altitude au départ, f(0) ?",
        points: 2,
        difficulty: 1,
        data: { value: 100, tolerance: 0 },
        hints: [
          { text: "Cette valeur est donnée directement dans l'énoncé.", malus: 1 },
          { text: "Relis la valeur associée à f(0).", malus: 1 },
        ],
        solution: "100",
        explanation: "L'énoncé donne directement f(0) = 100 m.",
      },
      {
        type: "QCM",
        statement: "Quel est le maximum de f sur [0 ; 12], et en quelle valeur de x est-il atteint ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "300, atteint en x = 4",
            "220, atteint en x = 12",
            "150, atteint en x = 9",
            "100, atteint en x = 0",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Le maximum est atteint à un changement de sens de variation, quand f passe de croissante à décroissante.", malus: 1 },
          { text: "Compare les quatre valeurs connues : f(0) = 100, f(4) = 300, f(9) = 150, f(12) = 220.", malus: 1 },
        ],
        solution: "300, atteint en x = 4",
        explanation: "f croît sur [0 ; 4] jusqu'à 300, puis décroît : le maximum sur [0 ; 12] est 300, atteint en x = 4.",
      },
      {
        type: "QCM",
        statement: "Quel est le minimum de f sur [0 ; 12] ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "100, atteint en x = 0",
            "150, atteint en x = 9",
            "220, atteint en x = 12",
            "300, atteint en x = 4",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "f est croissante sur [0 ; 4] : la plus petite valeur sur cet intervalle est donc f(0).", malus: 1 },
          { text: "Sur [4 ; 9] et [9 ; 12], toutes les valeurs de f restent supérieures à f(0) = 100 (le minimum local en x = 9 vaut 150).", malus: 1 },
        ],
        solution: "100, atteint en x = 0",
        explanation:
          "f est croissante sur [0 ; 4], donc f(0) = 100 est la plus petite valeur sur cet intervalle. Sur [4 ; 9], f décroît jusqu'à 150 (supérieur à 100), puis croît sur [9 ; 12]. Le minimum sur tout le parcours est donc 100, atteint en x = 0.",
      },
      {
        type: "NUMERIC",
        statement:
          "Sur l'intervalle [4 ; 9], f est décroissante, avec f(4) = 300 et f(9) = 150. Quelle est la baisse d'altitude (en m) sur cet intervalle ?",
        points: 4,
        difficulty: 3,
        data: { value: 150, tolerance: 0 },
        hints: [
          { text: "La baisse d'altitude est la différence entre l'altitude de départ et l'altitude d'arrivée de ce tronçon.", malus: 1 },
          { text: "Calcule 300 − 150.", malus: 1 },
        ],
        solution: "150",
        explanation: "La baisse d'altitude est 300 − 150 = 150 m.",
      },
      {
        type: "QCM",
        statement:
          "On compare f(2) et f(3), avec 2 < 3, deux valeurs de l'intervalle [0 ; 4] où f est croissante. Que peut-on en déduire ?",
        points: 4,
        difficulty: 3,
        data: {
          options: [
            "f(2) < f(3), car f est croissante sur [0 ; 4]",
            "f(2) > f(3), car f est croissante sur [0 ; 4]",
            "f(2) = f(3)",
            "On ne peut pas savoir sans calculer f(2) et f(3)",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Une fonction croissante sur un intervalle conserve l'ordre : si a < b, alors f(a) < f(b).", malus: 1 },
          { text: "Ici 2 < 3, et les deux valeurs appartiennent à l'intervalle de croissance [0 ; 4].", malus: 1 },
        ],
        solution: "f(2) < f(3), car f est croissante sur [0 ; 4]",
        explanation:
          "Sur un intervalle où f est croissante, l'ordre des images suit l'ordre des antécédents : puisque 2 < 3, on a f(2) < f(3), sans avoir besoin de connaître leurs valeurs exactes.",
      },
    ],
  },
  {
    slug: "signe-et-variations-d-une-fonction-affine",
    title: "Variations et signe d'une fonction affine",
    difficulty: 2,
    intro: "On considère la fonction affine f définie par f(x) = −2x + 8.",
    questions: [
      {
        type: "NUMERIC",
        statement: "Quel est le coefficient directeur (taux d'accroissement) m de f ?",
        points: 2,
        difficulty: 1,
        data: { value: -2, tolerance: 0 },
        hints: [
          { text: "Une fonction affine s'écrit f(x) = mx + p.", malus: 1 },
          { text: "Identifie le coefficient devant x dans f(x) = −2x + 8.", malus: 1 },
        ],
        solution: "−2",
        explanation: "Dans f(x) = −2x + 8, le coefficient directeur est m = −2.",
      },
      {
        type: "NUMERIC",
        statement: "Quelle est l'ordonnée à l'origine p de f ?",
        points: 2,
        difficulty: 1,
        data: { value: 8, tolerance: 0 },
        hints: [
          { text: "L'ordonnée à l'origine est le terme constant p dans f(x) = mx + p.", malus: 1 },
          { text: "Identifie le terme constant dans f(x) = −2x + 8.", malus: 1 },
        ],
        solution: "8",
        explanation: "Dans f(x) = −2x + 8, l'ordonnée à l'origine est p = 8.",
      },
      {
        type: "QCM",
        statement: "Quel est le sens de variation de f sur ℝ ?",
        points: 3,
        difficulty: 2,
        data: {
          options: [
            "Décroissante, car m = −2 < 0",
            "Croissante, car m = −2 < 0",
            "Constante",
            "On ne peut pas savoir",
          ],
          correctIndex: 0,
        },
        hints: [
          { text: "Une fonction affine f(x) = mx + p est croissante si m > 0, décroissante si m < 0.", malus: 1 },
          { text: "Ici m = −2, qui est négatif.", malus: 1 },
        ],
        solution: "Décroissante, car m = −2 < 0",
        explanation: "Comme le coefficient directeur m = −2 est négatif, la fonction affine f est décroissante sur ℝ.",
      },
      {
        type: "NUMERIC",
        statement:
          "Résous l'équation f(x) = 0 pour déterminer où la droite représentative de f coupe l'axe des abscisses.",
        points: 3,
        difficulty: 2,
        data: { value: 4, tolerance: 0 },
        hints: [
          { text: "Résous −2x + 8 = 0.", malus: 1 },
          { text: "Isole x : −2x = −8, puis divise par −2.", malus: 1 },
        ],
        solution: "4",
        explanation: "−2x + 8 = 0 équivaut à −2x = −8, donc x = 4.",
      },
      {
        type: "QCM",
        statement: "Quel est le signe de f(x) pour x < 4 ?",
        points: 4,
        difficulty: 3,
        data: {
          options: ["Positif", "Négatif", "Nul", "Cela dépend de x"],
          correctIndex: 0,
        },
        hints: [
          { text: "f est décroissante et s'annule en x = 4.", malus: 1 },
          { text: "Pour x < 4, on est \"avant\" le zéro d'une fonction décroissante : les valeurs de f y sont donc plus grandes que f(4) = 0.", malus: 1 },
        ],
        solution: "Positif",
        explanation: "f est décroissante et f(4) = 0. Pour x < 4, on a donc f(x) > f(4) = 0 : f(x) est positif.",
      },
      {
        type: "QCM",
        statement: "Quel est le signe de f(x) pour x > 4 ?",
        points: 4,
        difficulty: 3,
        data: {
          options: ["Négatif", "Positif", "Nul", "Cela dépend de x"],
          correctIndex: 0,
        },
        hints: [
          { text: "f est décroissante et s'annule en x = 4.", malus: 1 },
          { text: "Pour x > 4, on est \"après\" le zéro d'une fonction décroissante : les valeurs de f y sont donc plus petites que f(4) = 0.", malus: 1 },
        ],
        solution: "Négatif",
        explanation: "f est décroissante et f(4) = 0. Pour x > 4, on a donc f(x) < f(4) = 0 : f(x) est négatif.",
      },
    ],
  },
];
