import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, hashToken } from "@/lib/password";
import { STUDENT_COOKIE_MAX_AGE, STUDENT_COOKIE_NAME, createStudentSessionToken } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }

  const { token, password } = parsed.data;
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Ce lien de réinitialisation est invalide ou expiré." }, { status: 400 });
  }

  const { hash, salt } = hashPassword(password);

  const student = await prisma.$transaction(async (tx) => {
    const updated = await tx.student.update({
      where: { id: resetToken.studentId },
      data: { passwordHash: hash, passwordSalt: salt },
    });
    await tx.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    });
    return updated;
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDENT_COOKIE_NAME, await createStudentSessionToken(student.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDENT_COOKIE_MAX_AGE,
  });
  return response;
}
