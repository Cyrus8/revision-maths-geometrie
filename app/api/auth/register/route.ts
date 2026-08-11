import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { STUDENT_COOKIE_MAX_AGE, STUDENT_COOKIE_NAME, createStudentSessionToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 409 });
  }

  const { hash, salt } = hashPassword(password);
  const student = await prisma.student.create({
    data: { name, email, passwordHash: hash, passwordSalt: salt },
  });

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
