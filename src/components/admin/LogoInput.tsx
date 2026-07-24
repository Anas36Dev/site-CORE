"use client";

import { useState } from "react";

/** Champ URL/chemin d'image avec aperçu en direct à côté. */
export function LogoInput({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <input
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setBroken(false);
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
      />
      {value && !broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="aperçu"
          onError={() => setBroken(true)}
          className="size-11 shrink-0 rounded-md bg-navy-800 object-contain ring-1 ring-navy-600"
        />
      ) : (
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-navy-800 text-[0.55rem] uppercase text-steel-500 ring-1 ring-navy-600">
          aperçu
        </span>
      )}
    </div>
  );
}
