"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/Badge";

type ProblemRow = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  chapterName: string;
  themeName: string;
  questionCount: number;
  attemptCount: number;
};

export function AdminProblemsTable({ problems }: { problems: ProblemRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(problem: ProblemRow) {
    const warning =
      problem.attemptCount > 0
        ? `Supprimer "${problem.title}" effacera aussi les ${problem.attemptCount} tentative(s) d'élèves associées. Continuer ?`
        : `Supprimer "${problem.title}" ?`;
    if (!window.confirm(warning)) return;

    setDeletingId(problem.id);
    try {
      const response = await fetch(`/api/admin/problems/${problem.id}`, { method: "DELETE" });
      if (response.ok) {
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (problems.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucun problème pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Titre</th>
            <th className="py-2 pr-4 font-medium">Chapitre</th>
            <th className="py-2 pr-4 font-medium">Questions</th>
            <th className="py-2 pr-4 font-medium">Statut</th>
            <th className="py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id} className="border-b border-border last:border-0">
              <td className="py-2 pr-4 text-foreground">{problem.title}</td>
              <td className="py-2 pr-4 text-muted-foreground">
                {problem.themeName} — {problem.chapterName}
              </td>
              <td className="py-2 pr-4 text-muted-foreground">{problem.questionCount}</td>
              <td className="py-2 pr-4">
                <Badge tone={problem.published ? "success" : "neutral"}>
                  {problem.published ? "Publié" : "Brouillon"}
                </Badge>
              </td>
              <td className="py-2">
                <div className="flex flex-wrap gap-3">
                  <Link href={`/admin/problems/${problem.id}`} className="text-accent hover:underline">
                    Éditer
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(problem)}
                    disabled={deletingId === problem.id}
                    className="text-danger hover:underline disabled:opacity-50"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
