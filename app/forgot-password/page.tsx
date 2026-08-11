"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devResetLink, setDevResetLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setDevResetLink("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setMessage(data.message);
      if (data.devResetLink) setDevResetLink(data.devResetLink);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-wide flex justify-center py-12 sm:py-16">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-foreground">Mot de passe oublié</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Indique ton email pour générer un lien de réinitialisation.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {error && <p className="text-sm text-danger">{error}</p>}
          {message && <p className="text-sm text-success">{message}</p>}

          {devResetLink && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p className="font-medium">Aucun service d&apos;email n&apos;est encore branché.</p>
              <p className="mt-1">
                Lien de réinitialisation (visible ici uniquement en développement) :
              </p>
              <Link href={devResetLink} className="mt-1 block break-all font-mono text-xs underline">
                {devResetLink}
              </Link>
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Envoi..." : "Générer le lien"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
