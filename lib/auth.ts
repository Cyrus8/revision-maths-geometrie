import { cookies } from "next/headers";

// Uses the Web Crypto API (available in both the Node.js and Edge runtimes)
// so the same code can run in middleware and in route handlers.

export type SessionRole = "admin" | "student";

export type SessionPayload = {
  role: SessionRole;
  subjectId: string;
};

const ADMIN_TTL_MS = 1000 * 60 * 60 * 12; // 12h
const STUDENT_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export const ADMIN_COOKIE_NAME = "admin_session";
export const STUDENT_COOKIE_NAME = "student_session";

function getSecretKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string): Promise<string> {
  const key = await getSecretKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toHex(signature);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// subjectId must not contain dots: cuid()s never do.
async function createToken(role: SessionRole, subjectId: string, ttlMs: number): Promise<string> {
  const expires = Date.now() + ttlMs;
  const payload = `${role}.${subjectId}.${expires}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

async function verifyToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [role, subjectId, expiresRaw, signature] = parts;
  const payload = `${role}.${subjectId}.${expiresRaw}`;
  const expected = await sign(payload);
  if (!constantTimeEqual(signature, expected)) return null;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;

  if (role !== "admin" && role !== "student") return null;
  return { role, subjectId };
}

export function createAdminSessionToken(): Promise<string> {
  return createToken("admin", "admin", ADMIN_TTL_MS);
}

export function createStudentSessionToken(studentId: string): Promise<string> {
  return createToken("student", studentId, STUDENT_TTL_MS);
}

export const ADMIN_COOKIE_MAX_AGE = ADMIN_TTL_MS / 1000;
export const STUDENT_COOKIE_MAX_AGE = STUDENT_TTL_MS / 1000;

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const session = await verifyToken(token);
  return session?.role === "admin";
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !password) return false;
  return constantTimeEqual(password, expected);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
}

export async function getCurrentStudentId(): Promise<string | null> {
  const store = await cookies();
  const session = await verifyToken(store.get(STUDENT_COOKIE_NAME)?.value);
  return session?.role === "student" ? session.subjectId : null;
}
