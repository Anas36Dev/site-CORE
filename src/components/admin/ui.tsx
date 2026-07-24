import Link from "next/link";
import { clsx } from "clsx";

/** Champ de formulaire avec libellé et indice optionnel. */
export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-steel-100">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-steel-500">{hint}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx(inputBase, props.className)} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea {...props} className={clsx(inputBase, "min-h-24", props.className)} />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={clsx(inputBase, props.className)} />;
}

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60",
        props.className,
      )}
    />
  );
}

export function LinkButton({
  href,
  children,
  variant = "secondary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        variant === "primary"
          ? "bg-gold-500 text-navy-950 hover:bg-gold-400"
          : "gold-hairline bg-navy-800 text-steel-100 hover:bg-navy-700",
      )}
    >
      {children}
    </Link>
  );
}

/** En-tête de section admin. */
export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-navy-700 pb-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-steel-100">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-steel-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
