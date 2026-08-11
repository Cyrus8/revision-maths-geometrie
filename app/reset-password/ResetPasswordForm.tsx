"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/seconde");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-foreground">Lien invalide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ce lien de réinitialisation est incomplet. Redemande-en un depuis la page mot de passe
          oublié.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-foreground">Choisir un nouveau mot de passe</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <TextField
          id="password"
          label="Nouveau mot de passe (8 caractères min.)"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Réinitialiser le mot de passe"}
        </Button>
      </form>
    </Card>
  );
}
