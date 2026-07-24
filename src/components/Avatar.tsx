"use client";

import { useState } from "react";
import { clsx } from "clsx";

/**
 * Avatar d'un membre avec repli en cascade :
 * photo manuelle → photo Discord → monogramme (initiales) dans la charte CORE.
 */
export function Avatar({
  src,
  discordSrc,
  name,
  size = 48,
  className,
}: {
  src?: string | null;
  discordSrc?: string | null;
  name: string;
  size?: number;
  className?: string;
}) {
  const candidates = [src, discordSrc].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const current = candidates[idx];

  const initials =
    name
      .normalize("NFD")
      .replace(/[^\p{L}\p{N}]/gu, "")
      .slice(0, 2)
      .toUpperCase() || "?";

  if (current) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={current}
        alt={name}
        width={size}
        height={size}
        onError={() => setIdx((i) => i + 1)}
        className={clsx(
          "shrink-0 rounded-full object-cover ring-1 ring-navy-600",
          className,
        )}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={clsx(
        "grid shrink-0 place-items-center rounded-full bg-navy-800 font-semibold text-gold-400 ring-1 ring-gold-500/40",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
