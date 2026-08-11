"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/admin/problems");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-wide flex justify-center py-12 sm:py-16">
      <Card className="w-full max-w-sm p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-foreground">Mode admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accès réservé à la gestion des problèmes et des résultats.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <TextField
            id="password"
            label="Mot de passe admin"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Entrer"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
