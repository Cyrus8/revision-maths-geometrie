import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isAdminAuthenticated } from "@/lib/auth";

async function adminLogoutAction() {
  "use server";
  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div>
      <div className="border-b border-border bg-muted">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/admin/problems" className="font-medium text-foreground hover:text-accent">
              Problèmes
            </Link>
            <Link href="/admin/students" className="font-medium text-foreground hover:text-accent">
              Élèves &amp; résultats
            </Link>
          </nav>
          <form action={adminLogoutAction}>
            <button type="submit" className="text-muted-foreground hover:text-foreground">
              Quitter le mode admin
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
