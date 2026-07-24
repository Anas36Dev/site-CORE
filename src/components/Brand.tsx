"use client";

import { useState } from "react";
import { clsx } from "clsx";

/**
 * Logo CORE avec repli : si `/images/logo/core-logo.png` est absent,
 * on affiche un monogramme « CORE » cerclé d'or (rappel de l'anneau du logo).
 */
export function Brand({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        aria-label="CORE"
        className={clsx(
          "grid shrink-0 place-items-center rounded-full bg-navy-800 text-[0.62rem] font-bold tracking-widest text-gold-400 ring-2 ring-gold-500/60",
          className,
        )}
        style={{ width: size, height: size }}
      >
        CORE
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/images/logo/core-logo.png"
      alt="CORE — California Operational Roleplay Entity"
      width={size}
      height={size}
      onError={() => setBroken(true)}
      className={clsx("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
