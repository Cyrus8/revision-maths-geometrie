import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createRawToken, hashToken } from "@/lib/password";
import { forgotPasswordSchema } from "@/lib/validation";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60; // 1h

// No email provider is wired up yet, so the reset link is returned in the
// response instead of being emailed. Swap this for a real email send (Resend,
// SMTP, ...) before shipping to real users — see README.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }

  const { email } = parsed.data;
  const student = await prisma.student.findUnique({ where: { email } });

  const genericMessage = "Si un compte existe avec cet email, un lien de réinitialisation a été généré.";

  if (!student) {
    return NextResponse.json({ ok: true, message: genericMessage });
  }

  const rawToken = createRawToken();
  await prisma.passwordResetToken.create({
    data: {
      studentId: student.id,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });

  const resetUrl = new URL("/reset-password", request.url);
  resetUrl.searchParams.set("token", rawToken);

  return NextResponse.json({
    ok: true,
    message: genericMessage,
    devResetLink: resetUrl.toString(),
  });
}
