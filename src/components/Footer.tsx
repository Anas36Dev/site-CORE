import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-500/25 bg-navy-900/60">
      <div className="mx-auto max-w-6xl px-5 py-6 text-center sm:px-8">
        <p className="text-xs text-steel-500">
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-steel-100"
          >
            Mentions légales
          </Link>
          <span className="mx-2 text-navy-500">·</span>© 2019–2026 CORE France Project
        </p>
      </div>
    </footer>
  );
}
