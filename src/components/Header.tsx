"use client";

import { Menu, LogOut } from "lucide-react";
import { SiDiscord } from "@/components/icons";
import { Avatar } from "@/components/Avatar";
import type { CurrentMember } from "@/lib/auth";

export function Header({
  member,
  onOpenMenu,
}: {
  member: CurrentMember | null;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-navy-700 bg-navy-950/80 px-4 backdrop-blur sm:px-6">
      {/* Ouvre le menu sur mobile */}
      <button
        type="button"
        onClick={onOpenMenu}
        className="grid size-9 place-items-center rounded-lg text-steel-300 hover:bg-navy-800 hover:text-steel-100 lg:hidden"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      {member ? (
        <div className="flex items-center gap-1">
          <a
            href="/mon-compte"
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-3 transition-colors hover:bg-navy-800"
          >
            <Avatar
              src={member.avatarUrl}
              discordSrc={member.discordAvatarUrl}
              name={member.pseudo}
              size={32}
            />
            <span className="hidden text-sm font-medium text-steel-100 sm:inline">
              {member.pseudo}
            </span>
          </a>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              title="Se déconnecter"
              aria-label="Se déconnecter"
              className="grid size-9 place-items-center rounded-lg text-crimson-400 transition-colors hover:bg-navy-800"
            >
              <LogOut size={17} />
            </button>
          </form>
        </div>
      ) : (
        <a
          href="/api/auth/discord/login"
          className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          <SiDiscord size={17} />
          Se connecter
        </a>
      )}
    </header>
  );
}
