import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Connexion refusée" };

const REASONS: Record<string, string> = {
  membre:
    "Ton compte Discord n'est rattaché à aucune fiche membre CORE. Seuls les membres enregistrés par un Fondateur peuvent se connecter.",
  state:
    "La session de connexion a expiré ou est invalide. Merci de réessayer depuis le bouton « Se connecter ».",
  discord:
    "La communication avec Discord a échoué. Réessaie dans un instant.",
  config:
    "La connexion Discord n'est pas encore configurée sur ce site.",
};

export default async function ConnexionRefuseePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = REASONS[reason ?? ""] ?? REASONS.membre;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      <span className="gold-hairline grid size-14 place-items-center rounded-full bg-navy-800 text-crimson-400">
        <ShieldAlert size={26} />
      </span>
      <h1 className="mt-5 text-2xl font-semibold text-steel-100">
        Connexion refusée
      </h1>
      <p className="mt-3 text-balance text-steel-300">{message}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-steel-100 ring-1 ring-navy-600 hover:bg-navy-700"
        >
          <Home size={16} />
          Retour à l'accueil
        </Link>
        <a
          href={process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/h693prnx85"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Rejoindre le Discord
        </a>
      </div>
    </div>
  );
}
