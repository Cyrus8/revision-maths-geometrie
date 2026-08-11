import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { STUDENT_COOKIE_MAX_AGE, STUDENT_COOKIE_NAME, createStudentSessionToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const student = await prisma.student.findUnique({ where: { email } });

  if (!student || !verifyPassword(password, student.passwordHash, student.passwordSalt)) {
    return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({
    ok: true,
    student: { id: student.id, name: student.name, email: student.email },
  });
  response.cookies.set(STUDENT_COOKIE_NAME, await createStudentSessionToken(student.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDENT_COOKIE_MAX_AGE,
  });
  return response;
}
