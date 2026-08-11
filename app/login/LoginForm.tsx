"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push(searchParams.get("next") ?? "/seconde");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-foreground">Connexion élève</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          id="password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
        <Link href="/forgot-password" className="font-medium text-accent">
          Mot de passe oublié ?
        </Link>
        <p>
          Pas encore de compte ?{" "}
          <Link href="/register" className="font-medium text-accent">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </Card>
  );
}
