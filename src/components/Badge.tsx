import { clsx } from "clsx";

export type Tone = "gold" | "crimson" | "federal" | "ok" | "steel";

const TONES: Record<Tone, string> = {
  gold: "bg-gold-500/12 text-gold-400 ring-gold-500/30",
  crimson: "bg-crimson-500/12 text-crimson-400 ring-crimson-500/30",
  federal: "bg-federal-500/15 text-federal-300 ring-federal-500/30",
  ok: "bg-ok-500/12 text-ok-500 ring-ok-500/30",
  steel: "bg-navy-800 text-steel-300 ring-navy-600",
};

export function Badge({
  children,
  tone = "steel",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
