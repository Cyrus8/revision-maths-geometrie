"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { ProblemPlayer } from "@/components/ProblemPlayer";
import { slugify } from "@/lib/slug";
import type {
  Hint,
  NumericData,
  QcmData,
  QuestionData,
  QuestionKind,
  ProblemDTO,
  TextData,
} from "@/lib/types";

export type DraftQuestion = {
  key: string;
  type: QuestionKind;
  statement: string;
  points: number;
  difficulty: number;
  data: QuestionData;
  hints: Hint[];
  solution: string;
  explanation: string;
};

export type DraftProblem = {
  chapterId: string;
  slug: string;
  title: string;
  intro: string;
  difficulty: number;
  published: boolean;
  order: number;
  questions: DraftQuestion[];
};

function defaultDataForType(type: QuestionKind): QuestionData {
  if (type === "QCM") return { options: ["", ""], correctIndex: 0 };
  if (type === "NUMERIC") return { value: 0, tolerance: 0.01 };
  return { accepted: [""] };
}

function emptyQuestion(key: string): DraftQuestion {
  return {
    key,
    type: "QCM",
    statement: "",
    points: 3,
    difficulty: 1,
    data: defaultDataForType("QCM"),
    hints: [],
    solution: "",
    explanation: "",
  };
}

export function ProblemEditor({
  chapters,
  problemId,
  initialProblem,
}: {
  chapters: { id: string; label: string }[];
  problemId?: string;
  initialProblem?: DraftProblem;
}) {
  const router = useRouter();
  const keyCounter = useRef(0);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [problem, setProblem] = useState<DraftProblem>(
    initialProblem ?? {
      chapterId: chapters[0]?.id ?? "",
      slug: "",
      title: "",
      intro: "",
      difficulty: 2,
      published: true,
      order: 0,
      questions: [],
    }
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initialProblem));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function nextKey() {
    keyCounter.current += 1;
    return `new-${keyCounter.current}`;
  }

  function updateTitle(title: string) {
    setProblem((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  }

  function addQuestion() {
    setProblem((current) => ({
      ...current,
      questions: [...current.questions, emptyQuestion(nextKey())],
    }));
  }

  function removeQuestion(key: string) {
    setProblem((current) => ({
      ...current,
      questions: current.questions.filter((question) => question.key !== key),
    }));
  }

  function moveQuestion(key: string, direction: -1 | 1) {
    setProblem((current) => {
      const index = current.questions.findIndex((question) => question.key === key);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.questions.length) return current;
      const next = [...current.questions];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, questions: next };
    });
  }

  function updateQuestion(key: string, patch: Partial<DraftQuestion>) {
    setProblem((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.key === key ? { ...question, ...patch } : question
      ),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const payload = {
        chapterId: problem.chapterId,
        slug: problem.slug,
        title: problem.title,
        intro: problem.intro,
        difficulty: problem.difficulty,
        published: problem.published,
        order: problem.order,
        questions: problem.questions.map((question) => ({
          type: question.type,
          statement: question.statement,
          points: question.points,
          difficulty: question.difficulty,
          data: cleanQuestionData(question),
          hints: question.hints,
          solution: question.solution,
          explanation: question.explanation,
        })),
      };

      const response = await fetch(
        problemId ? `/api/admin/problems/${problemId}` : "/api/admin/problems",
        {
          method: problemId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement.");
        return;
      }
      router.push("/admin/problems");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSaving(false);
    }
  }

  const previewProblem: ProblemDTO = {
    id: problemId ?? "preview",
    slug: problem.slug || "apercu",
    title: problem.title || "Sans titre",
    intro: problem.intro,
    difficulty: problem.difficulty,
    published: problem.published,
    order: problem.order,
    chapterId: problem.chapterId,
    questions: problem.questions.map((question, index) => ({
      id: question.key,
      order: index,
      type: question.type,
      statement: question.statement,
      points: question.points,
      difficulty: question.difficulty,
      data: question.data,
      hints: question.hints,
      solution: question.solution,
      explanation: question.explanation,
    })),
  };

  return (
    <div>
      <div className="flex gap-2 border-b border-border">
        <TabButton active={tab === "edit"} onClick={() => setTab("edit")}>
          Édition
        </TabButton>
        <TabButton
          active={tab === "preview"}
          onClick={() => setTab("preview")}
          disabled={problem.questions.length === 0}
        >
          Aperçu
        </TabButton>
      </div>

      {tab === "edit" ? (
        <div className="mt-6 space-y-6">
          <Card className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">Informations générales</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Chapitre</label>
                <select
                  value={problem.chapterId}
                  onChange={(event) =>
                    setProblem((current) => ({ ...current, chapterId: event.target.value }))
                  }
                  className="min-h-11 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.label}
                    </option>
                  ))}
                </select>
              </div>

              <TextField
                id="title"
                label="Titre du problème"
                value={problem.title}
                onChange={(event) => updateTitle(event.target.value)}
              />
              <TextField
                id="slug"
                label="Slug (URL)"
                value={problem.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setProblem((current) => ({ ...current, slug: slugify(event.target.value) }));
                }}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Difficulté globale</label>
                <select
                  value={problem.difficulty}
                  onChange={(event) =>
                    setProblem((current) => ({ ...current, difficulty: Number(event.target.value) }))
                  }
                  className="min-h-11 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                >
                  <option value={1}>Facile</option>
                  <option value={2}>Moyen</option>
                  <option value={3}>Difficile</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-7">
                <input
                  id="published"
                  type="checkbox"
                  checked={problem.published}
                  onChange={(event) =>
                    setProblem((current) => ({ ...current, published: event.target.checked }))
                  }
                  className="h-4 w-4"
                />
                <label htmlFor="published" className="text-sm text-foreground">
                  Publié (visible par les élèves)
                </label>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Introduction (mise en situation du problème)
                </label>
                <textarea
                  value={problem.intro}
                  onChange={(event) =>
                    setProblem((current) => ({ ...current, intro: event.target.value }))
                  }
                  rows={4}
                  className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                />
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Questions ({problem.questions.length})
              </h2>
              <Button type="button" variant="secondary" onClick={addQuestion}>
                Ajouter une question
              </Button>
            </div>

            {problem.questions.map((question, index) => (
              <QuestionEditor
                key={question.key}
                question={question}
                index={index}
                total={problem.questions.length}
                onChange={(patch) => updateQuestion(question.key, patch)}
                onRemove={() => removeQuestion(question.key)}
                onMove={(direction) => moveQuestion(question.key, direction)}
              />
            ))}

            {problem.questions.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">
                Aucune question pour l&apos;instant. Ajoute-en au moins une.
              </Card>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <ProblemPlayer
            problem={previewProblem}
            chapterSlug="#"
            chapterName="Aperçu"
            previewMode
          />
        </div>
      )}
    </div>
  );
}

function cleanQuestionData(question: DraftQuestion): QuestionData {
  if (question.type === "TEXT") {
    const data = question.data as TextData;
    return { accepted: data.accepted.map((value) => value.trim()).filter(Boolean) };
  }
  if (question.type === "QCM") {
    const data = question.data as QcmData;
    return { options: data.options, correctIndex: data.correctIndex };
  }
  return question.data;
}

function TabButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        active ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function QuestionEditor({
  question,
  index,
  total,
  onChange,
  onRemove,
  onMove,
}: {
  question: DraftQuestion;
  index: number;
  total: number;
  onChange: (patch: Partial<DraftQuestion>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">Question {index + 1}</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" onClick={() => onMove(-1)} disabled={index === 0}>
            ↑
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
          >
            ↓
          </Button>
          <Button type="button" variant="ghost" onClick={onRemove}>
            Supprimer
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Type</label>
          <select
            value={question.type}
            onChange={(event) => {
              const type = event.target.value as QuestionKind;
              onChange({ type, data: defaultDataForType(type) });
            }}
            className="min-h-11 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
          >
            <option value="QCM">QCM</option>
            <option value="NUMERIC">Numérique</option>
            <option value="TEXT">Texte court</option>
          </select>
        </div>

        <TextField
          id={`points-${question.key}`}
          label="Points"
          type="number"
          min={1}
          max={20}
          value={question.points}
          onChange={(event) => onChange({ points: Number(event.target.value) || 0 })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Difficulté</label>
          <select
            value={question.difficulty}
            onChange={(event) => onChange({ difficulty: Number(event.target.value) })}
            className="min-h-11 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
          >
            <option value={1}>Facile</option>
            <option value={2}>Moyen</option>
            <option value={3}>Difficile</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Énoncé</label>
        <textarea
          value={question.statement}
          onChange={(event) => onChange({ statement: event.target.value })}
          rows={3}
          className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
      </div>

      <div className="mt-4">
        <QuestionDataEditor question={question} onChange={onChange} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          id={`solution-${question.key}`}
          label="Réponse attendue (affichée après validation)"
          value={question.solution}
          onChange={(event) => onChange({ solution: event.target.value })}
        />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Explication complète</label>
        <textarea
          value={question.explanation}
          onChange={(event) => onChange({ explanation: event.target.value })}
          rows={3}
          className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
      </div>

      <HintsEditor question={question} onChange={onChange} />
    </Card>
  );
}

function QuestionDataEditor({
  question,
  onChange,
}: {
  question: DraftQuestion;
  onChange: (patch: Partial<DraftQuestion>) => void;
}) {
  if (question.type === "QCM") {
    const data = question.data as QcmData;
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Options (coche la bonne réponse)
        </label>
        {data.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.key}`}
              checked={data.correctIndex === optionIndex}
              onChange={() => onChange({ data: { ...data, correctIndex: optionIndex } })}
            />
            <input
              value={option}
              onChange={(event) => {
                const options = [...data.options];
                options[optionIndex] = event.target.value;
                onChange({ data: { ...data, options } });
              }}
              className="min-h-10 flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
            <button
              type="button"
              disabled={data.options.length <= 2}
              onClick={() => {
                const options = data.options.filter((_, i) => i !== optionIndex);
                const correctIndex = Math.min(data.correctIndex, options.length - 1);
                onChange({ data: { options, correctIndex } });
              }}
              className="text-sm text-muted-foreground hover:text-danger disabled:opacity-40"
            >
              ✕
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          onClick={() => onChange({ data: { ...data, options: [...data.options, ""] } })}
          className="self-start"
        >
          Ajouter une option
        </Button>
      </div>
    );
  }

  if (question.type === "NUMERIC") {
    const data = question.data as NumericData;
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`value-${question.key}`}
          label="Valeur attendue"
          type="number"
          step="any"
          value={data.value}
          onChange={(event) => onChange({ data: { ...data, value: Number(event.target.value) || 0 } })}
        />
        <TextField
          id={`tolerance-${question.key}`}
          label="Tolérance (±)"
          type="number"
          step="any"
          min={0}
          value={data.tolerance}
          onChange={(event) =>
            onChange({ data: { ...data, tolerance: Number(event.target.value) || 0 } })
          }
        />
      </div>
    );
  }

  const data = question.data as TextData;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Réponses acceptées (une par ligne)
      </label>
      <textarea
        value={data.accepted.join("\n")}
        onChange={(event) => onChange({ data: { accepted: event.target.value.split("\n") } })}
        rows={3}
        className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
      />
    </div>
  );
}

function HintsEditor({
  question,
  onChange,
}: {
  question: DraftQuestion;
  onChange: (patch: Partial<DraftQuestion>) => void;
}) {
  function updateHint(hintIndex: number, patch: Partial<Hint>) {
    const hints = question.hints.map((hint, i) => (i === hintIndex ? { ...hint, ...patch } : hint));
    onChange({ hints });
  }

  function removeHint(hintIndex: number) {
    onChange({ hints: question.hints.filter((_, i) => i !== hintIndex) });
  }

  function addHint() {
    onChange({ hints: [...question.hints, { text: "", malus: 1 }] });
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        Indices (malus faible, révélés dans l&apos;ordre)
      </label>
      {question.hints.map((hint, hintIndex) => (
        <div key={hintIndex} className="flex items-center gap-2">
          <input
            value={hint.text}
            onChange={(event) => updateHint(hintIndex, { text: event.target.value })}
            placeholder={`Indice ${hintIndex + 1}`}
            className="min-h-10 flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
          <input
            type="number"
            min={0}
            value={hint.malus}
            onChange={(event) => updateHint(hintIndex, { malus: Number(event.target.value) || 0 })}
            className="min-h-10 w-20 rounded-lg border border-border bg-white px-2 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
          <span className="text-xs text-muted-foreground">pts</span>
          <button
            type="button"
            onClick={() => removeHint(hintIndex)}
            className="text-sm text-muted-foreground hover:text-danger"
          >
            ✕
          </button>
        </div>
      ))}
      <Button type="button" variant="ghost" onClick={addHint} className="self-start">
        Ajouter un indice
      </Button>
    </div>
  );
}
