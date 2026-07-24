"use client";

import { clsx } from "clsx";

/** Bouton de soumission avec confirmation (pour les suppressions). */
export function ConfirmButton({
  children,
  message = "Confirmer cette action ?",
  className,
}: {
  children: React.ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-sm font-medium text-crimson-400 ring-1 ring-navy-600 transition-colors hover:bg-navy-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
