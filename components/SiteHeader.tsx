import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STUDENT_COOKIE_NAME, getCurrentStudentId } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function logoutAction() {
  "use server";
  const store = await cookies();
  store.set(STUDENT_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/");
}

export async function SiteHeader() {
  const studentId = await getCurrentStudentId();
  const student = studentId
    ? await prisma.student.findUnique({ where: { id: studentId }, select: { name: true } })
    : null;

  return (
    <header className="border-b border-border bg-white">
      <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="text-lg font-semibold text-foreground">
          Révision<span className="text-accent">Maths</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/seconde" className="hover:text-foreground">
            Seconde
          </Link>
          {student ? (
            <>
              <Link href="/mes-resultats" className="hover:text-foreground">
                Mes résultats
              </Link>
              <span className="text-foreground">Bonjour, {student.name.split(" ")[0]}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-foreground">
                Se connecter
              </Link>
              <Link href="/register" className="hover:text-foreground">
                S&apos;inscrire
              </Link>
            </>
          )}
          <Link href="/admin" className="hover:text-foreground">
            Mode admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="hover:text-foreground">
        Se déconnecter
      </button>
    </form>
  );
}
