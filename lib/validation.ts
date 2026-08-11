import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis.").max(100),
  email: z.string().trim().toLowerCase().email("Adresse email invalide."),
  password: z.string().min(8, "8 caractères minimum."),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide."),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "8 caractères minimum."),
});

export const hintSchema = z.object({
  text: z.string().min(1, "Le texte de l'indice est requis."),
  malus: z.number().min(0),
});

export const qcmDataSchema = z
  .object({
    options: z.array(z.string().min(1, "Une option ne peut pas être vide.")).min(2, "2 options minimum."),
    correctIndex: z.number().int().min(0),
  })
  .refine((data) => data.correctIndex < data.options.length, {
    message: "La bonne réponse doit correspondre à une option existante.",
    path: ["correctIndex"],
  });

export const numericDataSchema = z.object({
  value: z.number(),
  tolerance: z.number().min(0),
});

export const textDataSchema = z.object({
  accepted: z.array(z.string().min(1, "Une réponse acceptée ne peut pas être vide.")).min(1),
});

const questionBaseSchema = {
  statement: z.string().min(1, "L'énoncé est requis."),
  points: z.number().int().min(1).max(20),
  difficulty: z.number().int().min(1).max(3),
  hints: z.array(hintSchema).max(5),
  solution: z.string().min(1, "La réponse attendue est requise."),
  explanation: z.string().min(1, "L'explication est requise."),
};

export const questionInputSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("QCM"), data: qcmDataSchema, ...questionBaseSchema }),
  z.object({ type: z.literal("NUMERIC"), data: numericDataSchema, ...questionBaseSchema }),
  z.object({ type: z.literal("TEXT"), data: textDataSchema, ...questionBaseSchema }),
]);

export const problemInputSchema = z.object({
  chapterId: z.string().min(1, "Le chapitre est requis."),
  slug: z
    .string()
    .min(1, "Le slug est requis.")
    .regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets."),
  title: z.string().min(1, "Le titre est requis."),
  intro: z.string().min(1, "L'introduction est requise."),
  difficulty: z.number().int().min(1).max(3),
  published: z.boolean(),
  order: z.number().int().min(0),
  questions: z.array(questionInputSchema).min(1, "Au moins une question est requise."),
});
