import { NextResponse } from "next/server";
import { STUDENT_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDENT_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
