import { Briefcase, VenetianMask, Users } from "lucide-react";

/** Petit drapeau (SVG) pour les organisations à nom de pays. */
function Flag({ code }: { code: string }) {
  const common = "block size-4 shrink-0 rounded-[2px] ring-1 ring-navy-600";
  if (code === "it") {
    return (
      <svg viewBox="0 0 3 2" className={common} aria-hidden>
        <rect width="1" height="2" x="0" fill="#009246" />
        <rect width="1" height="2" x="1" fill="#ffffff" />
        <rect width="1" height="2" x="2" fill="#ce2b37" />
      </svg>
    );
  }
  if (code === "ru") {
    return (
      <svg viewBox="0 0 3 2" className={common} aria-hidden>
        <rect width="3" height="0.667" y="0" fill="#ffffff" />
        <rect width="3" height="0.667" y="0.667" fill="#0039a6" />
        <rect width="3" height="0.666" y="1.334" fill="#d52b1e" />
      </svg>
    );
  }
  if (code === "kz") {
    return (
      <svg viewBox="0 0 3 2" className={common} aria-hidden>
        <rect width="3" height="2" fill="#00afca" />
        <circle cx="1.5" cy="0.95" r="0.4" fill="#fec50c" />
      </svg>
    );
  }
  return null;
}

/** Motocyclette (SVG) pour les Motorcycle Clubs. */
function Moto({ size }: { size: number }) {
  return (
    <svg
      width={size + 3}
      height={size + 3}
      viewBox="0 0 512 512"
      fill="currentColor"
      className="shrink-0 text-steel-500"
      aria-hidden
    >
      <path d="M416 256c-8 0-16 1-23 3l-30-53h47v-32h-64l17 30H207l-20-27h27V128h-64v32h13l19 26-25 44c-6-1-12-2-18-2C50 228 0 278 0 340s50 112 112 112 112-50 112-112c0-33-14-62-37-83l14-25 55 76h34c8 54 54 96 110 96 62 0 112-50 112-112s-50-96-100-96zM112 404c-35 0-64-29-64-64s29-64 64-64 64 29 64 64-29 64-64 64zm288 0c-35 0-64-29-64-64s29-64 64-64 64 29 64 64-29 64-64 64z" />
    </svg>
  );
}

/**
 * Icône d'une structure : image, ou marque spéciale (moto / drapeau / réunion),
 * ou fallback selon la catégorie (mallette légal, cagoule illégal).
 */
export function StructureMark({
  mark,
  category,
  size = 13,
}: {
  mark: string | null;
  category: string;
  size?: number;
}) {
  if (mark && mark.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={mark} alt="" className="size-4 shrink-0 rounded-sm object-contain" />;
  }
  if (mark === "moto") return <Moto size={size} />;
  if (mark === "meeting") return <Users size={size} className="shrink-0 text-steel-500" />;
  if (mark === "red")
    return <span className="block size-4 shrink-0 rounded-[3px] bg-crimson-500 ring-1 ring-crimson-400/50" />;
  if (mark && mark.startsWith("flag-")) return <Flag code={mark.slice(5)} />;
  return category === "ILLEGAL" ? (
    <VenetianMask size={size} className="shrink-0 text-steel-500" />
  ) : (
    <Briefcase size={size} className="shrink-0 text-steel-500" />
  );
}
