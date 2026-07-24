import type { LucideIcon } from "lucide-react";

export function PageHeader({
  badge,
  title,
  subtitle,
  icon: Icon,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}) {
  return (
    <header className="border-b border-navy-700 pb-6">
      {badge && <p className="label-tag mb-2">{badge}</p>}
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="gold-hairline grid place-items-center rounded-lg bg-navy-800 p-2 text-gold-400">
            <Icon size={22} strokeWidth={1.75} />
          </span>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-steel-100 sm:text-3xl">
          {title}
        </h1>
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-balance text-steel-300">{subtitle}</p>}
    </header>
  );
}

/** Encart temporaire signalant qu'un contenu sera branché en Phase 3. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel mt-8 px-5 py-8 text-center text-steel-500">
      {children}
    </div>
  );
}
