"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

type Check =
  | { type: "number"; value: number; tolerance?: number }
  | { type: "text"; accepted: string[] };

type Question = {
  prompt: string;
  check: Check;
  points: number;
  hint: string;
  solution: string;
  explanation: string;
  placeholder: string;
};

type Problem = {
  title: string;
  level: string;
  statement: string;
  figure: string;
  questions: Question[];
};

const problems: Problem[] = [
  {
    title: "Problème 1 - Droite dans un repère",
    level: "3e - 2nde",
    statement:
      "Dans un repère orthonormé, on place les points A(2 ; 3), B(8 ; 6) et C(8 ; 3). La droite (AB) représente le bord incliné d'un terrain triangulaire ABC.",
    figure: "A(2 ; 3), B(8 ; 6), C(8 ; 3)",
    questions: [
      {
        prompt: "Détermine le coefficient directeur de la droite (AB).",
        check: { type: "number", value: 0.5, tolerance: 0.001 },
        points: 4,
        hint: "Utilise la formule (yB - yA) / (xB - xA).",
        solution: "0,5",
        explanation:
          "On calcule (6 - 3) / (8 - 2) = 3 / 6 = 0,5. La droite monte donc de 0,5 unité quand x augmente de 1.",
        placeholder: "Ex. 0,5",
      },
      {
        prompt: "Trouve l'équation réduite de la droite (AB), sous la forme y = mx + p.",
        check: { type: "text", accepted: ["y=0.5x+2", "y=1/2x+2", "y=0,5x+2"] },
        points: 5,
        hint: "Tu connais m = 0,5. Remplace x et y par les coordonnées de A pour trouver p.",
        solution: "y = 0,5x + 2",
        explanation:
          "Avec A(2 ; 3), on a 3 = 0,5 × 2 + p, donc 3 = 1 + p et p = 2. L'équation est y = 0,5x + 2.",
        placeholder: "Ex. y = 0,5x + 2",
      },
      {
        prompt: "Calcule l'aire du triangle ABC.",
        check: { type: "number", value: 9, tolerance: 0.001 },
        points: 4,
        hint: "AC est horizontal et BC est vertical: le triangle est rectangle en C.",
        solution: "9 unités²",
        explanation:
          "AC = 8 - 2 = 6 et BC = 6 - 3 = 3. L'aire d'un triangle rectangle vaut base × hauteur / 2, donc 6 × 3 / 2 = 9.",
        placeholder: "Ex. 9",
      },
    ],
  },
  {
    title: "Problème 2 - Triangle rectangle et cercle",
    level: "4e - 2nde",
    statement:
      "Un triangle MNP est rectangle en N. On sait que MN = 6 cm et NP = 8 cm. Le point O est le milieu de l'hypoténuse [MP].",
    figure: "MN = 6 cm, NP = 8 cm, angle MNP = 90°",
    questions: [
      {
        prompt: "Calcule la longueur MP.",
        check: { type: "number", value: 10, tolerance: 0.001 },
        points: 4,
        hint: "Dans un triangle rectangle, l'hypoténuse vérifie MP² = MN² + NP².",
        solution: "10 cm",
        explanation: "MP² = 6² + 8² = 36 + 64 = 100. Donc MP = √100 = 10 cm.",
        placeholder: "Ex. 10",
      },
      {
        prompt: "Quelle est la longueur OM ?",
        check: { type: "number", value: 5, tolerance: 0.001 },
        points: 3,
        hint: "O est le milieu de l'hypoténuse [MP].",
        solution: "5 cm",
        explanation: "Comme O est le milieu de [MP], OM = MP / 2 = 10 / 2 = 5 cm.",
        placeholder: "Ex. 5",
      },
      {
        prompt: "Quelle est la nature du cercle de centre O passant par M ?",
        check: {
          type: "text",
          accepted: ["cercle circonscrit", "circonscrit", "cercle circonscrit au triangle"],
        },
        points: 4,
        hint: "Dans un triangle rectangle, le milieu de l'hypoténuse est équidistant des trois sommets.",
        solution: "Le cercle circonscrit au triangle MNP",
        explanation:
          "Dans un triangle rectangle, le milieu de l'hypoténuse est le centre du cercle circonscrit. Le cercle de centre O passant par M passe aussi par N et P.",
        placeholder: "Ex. cercle circonscrit",
      },
    ],
  },
  {
    title: "Problème 3 - Théorème de Thalès",
    level: "3e - 2nde",
    statement:
      "Dans le triangle ABC, les points M et N appartiennent respectivement aux segments [AB] et [AC]. Les droites (MN) et (BC) sont parallèles. On sait que AM = 4 cm, AB = 10 cm, AC = 15 cm et BC = 12 cm.",
    figure: "M sur [AB], N sur [AC], MN // BC",
    questions: [
      {
        prompt: "Calcule le rapport de réduction AM / AB.",
        check: { type: "number", value: 0.4, tolerance: 0.001 },
        points: 3,
        hint: "Divise la petite longueur AM par la grande longueur AB.",
        solution: "0,4",
        explanation:
          "AM / AB = 4 / 10 = 0,4. Le triangle AMN est donc une réduction du triangle ABC de rapport 0,4.",
        placeholder: "Ex. 0,4",
      },
      {
        prompt: "Calcule la longueur AN.",
        check: { type: "number", value: 6, tolerance: 0.001 },
        points: 4,
        hint: "Avec Thalès, AM / AB = AN / AC.",
        solution: "6 cm",
        explanation: "On a AN / 15 = 0,4, donc AN = 15 × 0,4 = 6 cm.",
        placeholder: "Ex. 6",
      },
      {
        prompt: "Calcule la longueur MN.",
        check: { type: "number", value: 4.8, tolerance: 0.001 },
        points: 4,
        hint: "Les longueurs du petit triangle sont multipliées par le même rapport 0,4.",
        solution: "4,8 cm",
        explanation:
          "Comme MN correspond à BC, on applique le rapport 0,4: MN = 12 × 0,4 = 4,8 cm.",
        placeholder: "Ex. 4,8",
      },
    ],
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/\*/g, "")
    .replace(/,/g, ".");
}

function parseNumber(value: string) {
  const match = value.replace(",", ".").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

function isCorrect(answer: string, check: Check) {
  if (check.type === "number") {
    const parsed = parseNumber(answer);
    return Number.isFinite(parsed) && Math.abs(parsed - check.value) <= (check.tolerance ?? 0.01);
  }

  const normalized = normalizeText(answer);
  return check.accepted.some((accepted) => normalizeText(accepted) === normalized);
}

function maxScore(problem: Problem) {
  return problem.questions.reduce((sum, question) => sum + question.points, 0);
}

export function RevisionMathsClient() {
  const [problemIndex, setProblemIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState<Record<string, boolean>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [solutions, setSolutions] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState("");

  const problem = problems[problemIndex];
  const question = problem.questions[questionIndex];
  const questionKey = `${problemIndex}-${questionIndex}`;
  const answer = answers[questionKey] ?? "";
  const solved = Boolean(validated[questionKey]);
  const helpUsed = Boolean(hints[questionKey]);
  const solutionUsed = Boolean(solutions[questionKey]);
  const progress = problem.questions.filter((_, index) => validated[`${problemIndex}-${index}`]).length;

  const score = useMemo(() => {
    return problems.reduce((total, currentProblem, currentProblemIndex) => {
      return (
        total +
        currentProblem.questions.reduce((sum, currentQuestion, currentQuestionIndex) => {
          const key = `${currentProblemIndex}-${currentQuestionIndex}`;
          if (!validated[key]) return sum;
          const penalty = (hints[key] ? 1 : 0) + (solutions[key] ? 3 : 0);
          return sum + Math.max(0, currentQuestion.points - penalty);
        }, 0)
      );
    }, 0);
  }, [hints, solutions, validated]);

  const total = problems.reduce((sum, currentProblem) => sum + maxScore(currentProblem), 0);
  const allDone = problemIndex === problems.length - 1 && questionIndex === problem.questions.length - 1 && solved;

  function submitAnswer() {
    if (isCorrect(answer, question.check)) {
      setValidated((current) => ({ ...current, [questionKey]: true }));
      setFeedback("Bonne réponse. Lis l'explication, puis passe à la suite.");
      return;
    }
    setFeedback("Pas encore. Vérifie la méthode, les unités ou l'écriture de la réponse.");
  }

  function showHint() {
    setHints((current) => ({ ...current, [questionKey]: true }));
  }

  function showSolution() {
    setSolutions((current) => ({ ...current, [questionKey]: true }));
    setAnswers((current) => ({ ...current, [questionKey]: question.solution }));
    setValidated((current) => ({ ...current, [questionKey]: true }));
    setFeedback("Solution affichée. Tu peux continuer, avec une pénalité plus forte.");
  }

  function nextQuestion() {
    setFeedback("");
    if (questionIndex < problem.questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }
    if (problemIndex < problems.length - 1) {
      setProblemIndex((current) => current + 1);
      setQuestionIndex(0);
    }
  }

  function restart() {
    setProblemIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setValidated({});
    setHints({});
    setSolutions({});
    setFeedback("");
  }

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Révision maths - géométrie</p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Problèmes progressifs collège lycée
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Réponds à chaque question pour débloquer la suivante. Une aide enlève 1 point, une
              solution enlève 3 points, et l&apos;explication apparaît après validation.
            </p>
          </div>
          <div className="rounded-xl bg-muted px-4 py-3 text-sm">
            <span className="block text-muted-foreground">Score</span>
            <span className="text-2xl font-semibold text-accent">
              {score} / {total}
            </span>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-foreground">Exemples</h2>
          <div className="mt-3 space-y-2">
            {problems.map((item, index) => {
              const active = index === problemIndex;
              const completed = item.questions.every((_, qIndex) => validated[`${index}-${qIndex}`]);
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setProblemIndex(index);
                    setQuestionIndex(0);
                    setFeedback("");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border bg-white text-foreground hover:border-accent"
                  }`}
                >
                  <span className="block font-medium">{item.title.replace("Problème ", "P")}</span>
                  <span className="text-xs text-muted-foreground">
                    {completed ? "Terminé" : `${item.questions.length} questions`}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {problem.level}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">{problem.title}</h2>
            </div>
            <p className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              Question {questionIndex + 1} / {problem.questions.length}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{problem.statement}</p>
          <div className="mt-4 rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground">
            {problem.figure}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <label htmlFor="answer" className="block text-base font-semibold text-foreground">
              {question.prompt}
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="answer"
                value={answer}
                onChange={(event) =>
                  setAnswers((current) => ({ ...current, [questionKey]: event.target.value }))
                }
                disabled={solved}
                placeholder={question.placeholder}
                className="min-h-11 flex-1 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:bg-muted"
              />
              <Button type="button" onClick={submitAnswer} disabled={solved || !answer.trim()}>
                Valider
              </Button>
            </div>

            {feedback && (
              <p className={`mt-3 text-sm ${solved ? "text-success" : "text-danger"}`}>{feedback}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={showHint} disabled={helpUsed || solved}>
                Aide (-1 pt)
              </Button>
              <Button type="button" variant="ghost" onClick={showSolution} disabled={solutionUsed || solved}>
                Voir la solution (-3 pts)
              </Button>
            </div>

            {helpUsed && (
              <div className="mt-4 rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Aide: </span>
                {question.hint}
              </div>
            )}

            {solved && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
                <p className="font-semibold">Réponse: {question.solution}</p>
                <p className="mt-2">{question.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Progression du problème: {progress} / {problem.questions.length}
              </p>
              {solved && !allDone && (
                <Button type="button" onClick={nextQuestion}>
                  Question suivante
                </Button>
              )}
              {allDone && (
                <Button type="button" onClick={restart}>
                  Recommencer
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
