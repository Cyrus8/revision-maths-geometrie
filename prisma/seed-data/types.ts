import type { Hint, QuestionData, QuestionKind } from "../../lib/types";

export type SeedQuestion = {
  type: QuestionKind;
  statement: string;
  points: number;
  difficulty: number;
  data: QuestionData;
  hints: Hint[];
  solution: string;
  explanation: string;
};

export type SeedProblem = {
  slug: string;
  title: string;
  intro: string;
  difficulty: number;
  showCalculator?: boolean;
  questions: SeedQuestion[];
};

export type SeedChapter = {
  themeSlug: string;
  slug: string;
  name: string;
  description: string;
  order: number;
  problems: SeedProblem[];
};

export type SeedTheme = {
  slug: string;
  name: string;
  description: string;
  order: number;
};
