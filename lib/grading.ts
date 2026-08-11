import type { NumericData, QcmData, QuestionDTO, TextData } from "@/lib/types";

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/['’]/g, "");
}

export function parseNumber(value: string) {
  const cleaned = value.replace(",", ".").replace(/\s/g, "");
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

export function isAnswerCorrect(question: QuestionDTO, rawAnswer: string): boolean {
  if (question.type === "QCM") {
    const data = question.data as QcmData;
    const selected = Number(rawAnswer);
    return Number.isInteger(selected) && selected === data.correctIndex;
  }

  if (question.type === "NUMERIC") {
    const data = question.data as NumericData;
    const parsed = parseNumber(rawAnswer);
    return Number.isFinite(parsed) && Math.abs(parsed - data.value) <= data.tolerance;
  }

  const data = question.data as TextData;
  const normalized = normalizeText(rawAnswer);
  if (!normalized) return false;
  return data.accepted.some((accepted) => normalizeText(accepted) === normalized);
}

export const WRONG_ATTEMPT_MALUS = 1;

export type QuestionOutcome = {
  status: "correct" | "skipped";
  hintsUsed: number;
  wrongAttempts: number;
};

export function questionScore(question: QuestionDTO, outcome: QuestionOutcome | undefined): number {
  if (!outcome || outcome.status === "skipped") return 0;
  const hintMalus = question.hints
    .slice(0, outcome.hintsUsed)
    .reduce((sum, hint) => sum + hint.malus, 0);
  const wrongMalus = outcome.wrongAttempts * WRONG_ATTEMPT_MALUS;
  return Math.max(0, question.points - hintMalus - wrongMalus);
}

export function maxPoints(questions: QuestionDTO[]): number {
  return questions.reduce((sum, question) => sum + question.points, 0);
}

export function scoreOn20(earned: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((earned / max) * 20 * 10) / 10;
}
