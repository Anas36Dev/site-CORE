"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * Bouton « Retour » qui revient à la page précédente (Notre équipe, Nos membres…)
 * avec repli sur une destination si l'historique est vide (accès direct).
 */
export function BackLink({
  fallback = "/membres",
  label = "Retour",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      className="mb-6 inline-flex items-center gap-1.5 text-sm text-steel-500 transition-colors hover:text-steel-100"
    >
      <ArrowLeft size={15} />
      {label}
    </button>
  );
}
