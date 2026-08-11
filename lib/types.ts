export type Hint = {
  text: string;
  malus: number;
};

export type QcmData = {
  options: string[];
  correctIndex: number;
};

export type NumericData = {
  value: number;
  tolerance: number;
};

export type TextData = {
  accepted: string[];
};

export type QuestionData = QcmData | NumericData | TextData;

export type QuestionKind = "QCM" | "NUMERIC" | "TEXT";

export type QuestionDTO = {
  id: string;
  order: number;
  type: QuestionKind;
  statement: string;
  points: number;
  difficulty: number;
  data: QuestionData;
  hints: Hint[];
  solution: string;
  explanation: string;
};

export type ProblemDTO = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  difficulty: number;
  published: boolean;
  order: number;
  chapterId: string;
  questions: QuestionDTO[];
};

export type ChapterSummary = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  themeSlug: string;
  themeName: string;
  problemCount: number;
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Facile",
  2: "Moyen",
  3: "Difficile",
};
