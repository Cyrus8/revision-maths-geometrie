"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { NotesPanel } from "@/components/NotesPanel";
import { Calculator } from "@/components/Calculator";
import {
  WRONG_ATTEMPT_MALUS,
  isAnswerCorrect,
  maxPoints,
  questionScore,
  scoreOn20,
  type QuestionOutcome,
} from "@/lib/grading";
import { DIFFICULTY_LABELS, type QcmData, type ProblemDTO } from "@/lib/types";

type SubmitResult = {
  score20: number;
  earnedPoints: number;
  maxPoints: number;
};

export function ProblemPlayer({
  problem,
  chapterSlug,
  chapterName,
  previewMode = false,
  guestMode = false,
}: {
  problem: ProblemDTO;
  chapterSlug: string;
  chapterName: string;
  previewMode?: boolean;
  guestMode?: boolean;
}) {
  const [startedAt] = useState(() => new Date().toISOString());
  const [viewIndex, setViewIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [outcomes, setOutcomes] = useState<Record<string, QuestionOutcome>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, string>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);

  const total = useMemo(() => maxPoints(problem.questions), [problem.questions]);

  const activeIndex = useMemo(() => {
    const firstUnresolved = problem.questions.findIndex((q) => !outcomes[q.id]);
    return firstUnresolved === -1 ? problem.questions.length - 1 : firstUnresolved;
  }, [problem.questions, outcomes]);

  const question = problem.questions[viewIndex];
  const outcome = outcomes[question.id];
  const hintsShown = revealedHints[question.id] ?? 0;
  const wrongForQuestion = wrongAttempts[question.id] ?? 0;
  const resolved = Boolean(outcome);
  const isLast = viewIndex === problem.questions.length - 1;
  const isPastQuestion = viewIndex < activeIndex;

  const liveEarned = problem.questions.reduce(
    (sum, q) => sum + questionScore(q, outcomes[q.id]),
    0
  );

  function recordOutcome(questionId: string, next: QuestionOutcome) {
    setOutcomes((current) => ({ ...current, [questionId]: next }));
  }

  function goToIndex(next: number) {
    const clamped = Math.max(0, Math.min(next, activeIndex));
    setViewIndex(clamped);
    setDraft("");
    setFeedback("idle");
  }

  function validate() {
    if (!draft.trim()) return;
    if (isAnswerCorrect(question, draft)) {
      setSubmittedAnswers((current) => ({ ...current, [question.id]: draft }));
      recordOutcome(question.id, {
        status: "correct",
        hintsUsed: hintsShown,
        wrongAttempts: wrongForQuestion,
      });
      setFeedback("correct");
    } else {
      setWrongAttempts((current) => ({ ...current, [question.id]: wrongForQuestion + 1 }));
      setFeedback("wrong");
    }
  }

  function revealHint() {
    if (hintsShown >= question.hints.length) return;
    setRevealedHints((current) => ({ ...current, [question.id]: hintsShown + 1 }));
  }

  function skip() {
    recordOutcome(question.id, {
      status: "skipped",
      hintsUsed: hintsShown,
      wrongAttempts: wrongForQuestion,
    });
    setFeedback("idle");
  }

  function goToNext() {
    setDraft("");
    setFeedback("idle");
    if (viewIndex < problem.questions.length - 1) {
      setViewIndex((current) => current + 1);
      return;
    }
    const allResolved = problem.questions.every((q) => outcomes[q.id]);
    if (allResolved) void submitAttempt();
  }

  function goToPrevious() {
    if (viewIndex === 0) return;
    setViewIndex((current) => current - 1);
    setDraft("");
    setFeedback("idle");
  }

  async function submitAttempt() {
    if (previewMode || guestMode) {
      setResult({ score20: scoreOn20(liveEarned, total), earnedPoints: liveEarned, maxPoints: total });
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const responses = problem.questions.map((q) => {
        const o = outcomes[q.id];
        return {
          questionId: q.id,
          rawAnswer: o?.status === "correct" ? (submittedAnswers[q.id] ?? "") : "",
          skipped: o?.status === "skipped",
          hintsUsed: o?.hintsUsed ?? 0,
          wrongAttempts: o?.wrongAttempts ?? 0,
        };
      });

      const response = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: problem.id, startedAt, responses }),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitError(data.error ?? "Impossible d'enregistrer la tentative.");
        return;
      }
      setResult({
        score20: data.attempt.score20,
        earnedPoints: data.attempt.earnedPoints,
        maxPoints: data.attempt.maxPoints,
      });
    } catch {
      setSubmitError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    setViewIndex(0);
    setDraft("");
    setOutcomes({});
    setSubmittedAnswers({});
    setRevealedHints({});
    setWrongAttempts({});
    setFeedback("idle");
    setNotes("");
    setResult(null);
    setSubmitError("");
  }

  const currentPath = `/seconde/${chapterSlug}/${problem.slug}`;

  if (result) {
    return (
      <ResultsScreen
        problem={problem}
        chapterSlug={chapterSlug}
        outcomes={outcomes}
        result={result}
        onRestart={restart}
        previewMode={previewMode}
        guestMode={guestMode}
        currentPath={currentPath}
      />
    );
  }

  return (
    <div className="space-y-5">
      {guestMode && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Mode invité : ta note ne sera pas enregistrée.{" "}
          <Link href={`/register?next=${encodeURIComponent(currentPath)}`} className="font-medium underline">
            Crée un compte
          </Link>{" "}
          pour suivre ta progression.
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-accent">{chapterName}</p>
                <h1 className="mt-1 text-2xl font-semibold text-foreground">{problem.title}</h1>
              </div>
              <div className="rounded-xl bg-muted px-4 py-3 text-sm">
                <span className="block text-muted-foreground">Score provisoire</span>
                <span className="text-xl font-semibold text-accent">
                  {liveEarned} / {total}
                </span>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {problem.intro}
            </p>
          </Card>

          <Stepper
            questions={problem.questions}
            outcomes={outcomes}
            viewIndex={viewIndex}
            activeIndex={activeIndex}
            onSelect={goToIndex}
          />

          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={viewIndex === 0}
                  className="text-sm text-muted-foreground hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Précédente
                </button>
                <Badge tone="accent">
                  Question {viewIndex + 1} / {problem.questions.length}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{DIFFICULTY_LABELS[question.difficulty] ?? "Moyen"}</Badge>
                <Badge tone="neutral">{question.points} pts</Badge>
              </div>
            </div>

            {isPastQuestion && (
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Question déjà traitée — consultation
              </p>
            )}

            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground">
              {question.statement}
            </p>

            <div className="mt-5">
              <AnswerInput
                question={question}
                value={resolved ? (submittedAnswers[question.id] ?? "") : draft}
                onChange={setDraft}
                disabled={resolved}
              />
            </div>

            {feedback === "wrong" && !resolved && (
              <p className="mt-3 text-sm text-danger">
                Pas encore correct (−{WRONG_ATTEMPT_MALUS} pt). Vérifie ta méthode et réessaie, ou
                demande un indice.
              </p>
            )}

            {!resolved && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" onClick={validate} disabled={!draft.trim()}>
                  Valider
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={revealHint}
                  disabled={hintsShown >= question.hints.length}
                >
                  {question.hints.length === 0
                    ? "Pas d'indice"
                    : hintsShown >= question.hints.length
                      ? "Indices épuisés"
                      : `Indice ${hintsShown + 1} (-${question.hints[hintsShown]?.malus} pt)`}
                </Button>
                <Button type="button" variant="ghost" onClick={skip}>
                  Je passe (0 pt)
                </Button>
              </div>
            )}

            {hintsShown > 0 && (
              <div className="mt-4 space-y-2">
                {question.hints.slice(0, hintsShown).map((hint, hintIndex) => (
                  <div
                    key={hintIndex}
                    className="rounded-xl border border-border bg-white p-3 text-sm text-muted-foreground"
                  >
                    <span className="font-medium text-foreground">Indice {hintIndex + 1} : </span>
                    {hint.text}
                  </div>
                ))}
              </div>
            )}

            {resolved && (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm leading-relaxed ${
                  outcome?.status === "correct"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-amber-200 bg-amber-50 text-amber-900"
                }`}
              >
                <p className="font-semibold">
                  {outcome?.status === "correct" ? "Bonne réponse ✓" : "Solution (question passée)"}
                  {" — "}
                  Réponse : {question.solution}
                </p>
                <p className="mt-2 whitespace-pre-line">{question.explanation}</p>
              </div>
            )}

            {resolved && (
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={goToNext} disabled={submitting}>
                  {submitting ? "Envoi..." : isLast ? "Voir mes résultats" : "Question suivante"}
                </Button>
              </div>
            )}

            {submitError && <p className="mt-3 text-sm text-danger">{submitError}</p>}
          </Card>
        </div>

        <div className="space-y-5">
          <NotesPanel value={notes} onChange={setNotes} onReset={() => setNotes("")} />
          {problem.showCalculator && <Calculator />}
        </div>
      </div>
    </div>
  );
}

function AnswerInput({
  question,
  value,
  onChange,
  disabled,
}: {
  question: ProblemDTO["questions"][number];
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  if (question.type === "QCM") {
    const data = question.data as QcmData;
    return (
      <div className="flex flex-col gap-2">
        {data.options.map((option, optionIndex) => {
          const selected = value === String(optionIndex);
          return (
            <button
              key={optionIndex}
              type="button"
              disabled={disabled}
              onClick={() => onChange(String(optionIndex))}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed ${
                selected
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-white text-foreground hover:border-accent"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      placeholder={question.type === "NUMERIC" ? "Ex : 3,5" : "Ta réponse"}
      className="min-h-11 w-full max-w-sm rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:bg-muted"
    />
  );
}

function Stepper({
  questions,
  outcomes,
  viewIndex,
  activeIndex,
  onSelect,
}: {
  questions: ProblemDTO["questions"];
  outcomes: Record<string, QuestionOutcome>;
  viewIndex: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, i) => {
        const outcome = outcomes[q.id];
        const isViewed = i === viewIndex;
        const reachable = i <= activeIndex;
        let classes = "border-border bg-white text-muted-foreground";
        let label = String(i + 1);
        if (outcome?.status === "correct") {
          classes = "border-emerald-300 bg-emerald-50 text-emerald-700";
          label = "✓";
        } else if (outcome?.status === "skipped") {
          classes = "border-amber-300 bg-amber-50 text-amber-700";
          label = "—";
        } else if (i === activeIndex) {
          classes = "border-accent bg-accent-soft text-accent";
        }
        if (isViewed) {
          classes += " ring-2 ring-accent ring-offset-1";
        }
        return (
          <button
            key={q.id}
            type="button"
            disabled={!reachable}
            onClick={() => onSelect(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${classes}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ResultsScreen({
  problem,
  chapterSlug,
  outcomes,
  result,
  onRestart,
  previewMode,
  guestMode,
  currentPath,
}: {
  problem: ProblemDTO;
  chapterSlug: string;
  outcomes: Record<string, QuestionOutcome>;
  result: SubmitResult;
  onRestart: () => void;
  previewMode: boolean;
  guestMode: boolean;
  currentPath: string;
}) {
  const tier =
    result.score20 >= 16
      ? "Excellent travail !"
      : result.score20 >= 12
        ? "Bien joué, continue comme ça."
        : result.score20 >= 8
          ? "Pas mal, mais ce chapitre mérite d'être retravaillé."
          : "Il faut reprendre ce chapitre avant de continuer.";

  return (
    <div className="space-y-5">
      <Card className="p-6 text-center sm:p-8">
        <p className="text-sm font-medium text-accent">{problem.title}</p>
        <p className="mt-4 text-5xl font-semibold text-foreground">{result.score20} / 20</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {result.earnedPoints} / {result.maxPoints} points bruts
        </p>
        <p className="mt-3 text-base text-foreground">{tier}</p>

        {guestMode && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Cette note n&apos;a pas été enregistrée (mode invité).{" "}
            <Link
              href={`/register?next=${encodeURIComponent(currentPath)}`}
              className="font-medium underline"
            >
              Crée un compte
            </Link>{" "}
            ou{" "}
            <Link href={`/login?next=${encodeURIComponent(currentPath)}`} className="font-medium underline">
              connecte-toi
            </Link>{" "}
            pour suivre ta progression.
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={onRestart}>
            Recommencer ce problème
          </Button>
          {!previewMode && (
            <Link href={`/seconde/${chapterSlug}`}>
              <Button type="button" variant="secondary">
                Retour au chapitre
              </Button>
            </Link>
          )}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-foreground">Détail par question</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 pr-4 font-medium">#</th>
                <th className="py-2 pr-4 font-medium">Statut</th>
                <th className="py-2 pr-4 font-medium">Indices</th>
                <th className="py-2 pr-4 font-medium">Erreurs</th>
                <th className="py-2 font-medium">Points</th>
              </tr>
            </thead>
            <tbody>
              {problem.questions.map((q, i) => {
                const outcome = outcomes[q.id];
                const earned = questionScore(q, outcome);
                return (
                  <tr key={q.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 text-foreground">{i + 1}</td>
                    <td className="py-2 pr-4">
                      {outcome?.status === "correct" ? (
                        <Badge tone="success">Réussie{outcome.hintsUsed > 0 ? " (avec aide)" : ""}</Badge>
                      ) : (
                        <Badge tone="warning">Passée</Badge>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{outcome?.hintsUsed ?? 0}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{outcome?.wrongAttempts ?? 0}</td>
                    <td className="py-2 text-foreground">
                      {earned} / {q.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
