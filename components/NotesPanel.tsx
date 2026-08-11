"use client";

import { Card } from "@/components/Card";

export function NotesPanel({
  value,
  onChange,
  onReset,
}: {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Mes notes</h2>
        <button
          type="button"
          onClick={() => {
            if (value.trim() && !window.confirm("Effacer toutes tes notes ?")) return;
            onReset();
          }}
          className="text-xs text-muted-foreground hover:text-danger"
        >
          Réinitialiser
        </button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Reste visible pendant tout le problème. Sers-t&apos;en pour poser tes calculs.
      </p>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Brouillon, calculs intermédiaires..."
        rows={10}
        className="mt-3 w-full resize-y rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
      />
    </Card>
  );
}
