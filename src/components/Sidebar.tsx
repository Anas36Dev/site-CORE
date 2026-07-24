"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { ChevronDown, ExternalLink, Settings } from "lucide-react";

import { Brand } from "@/components/Brand";
import {
  PRIMARY_NAV,
  EXTERNAL_NAV,
  AUTH_NAV,
  ADMIN_SECTIONS,
  isGroup,
  type NavLeaf,
} from "@/lib/nav";
import { isAdmin, type CurrentMember } from "@/lib/auth";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function LeafLink({
  item,
  active,
  onNavigate,
  nested,
}: {
  item: NavLeaf;
  active: boolean;
  onNavigate?: () => void;
  nested?: boolean;
}) {
  const Icon = item.icon;
  const base = clsx(
    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    nested && "pl-5",
    active
      ? "bg-navy-800 text-gold-400 ring-1 ring-gold-500/30"
      : "text-steel-300 hover:bg-navy-800/60 hover:text-steel-100",
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={base} onClick={onNavigate}>
        <Icon size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        <ExternalLink size={13} className="text-steel-500" />
      </a>
    );
  }

  return (
    <Link href={item.href} className={base} onClick={onNavigate}>
      <Icon size={18} strokeWidth={1.75} className="shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
    </Link>
  );
}

/** Contenu interne de la navigation, partagé desktop + drawer mobile. */
export function SidebarNav({
  member,
  onNavigate,
}: {
  member: CurrentMember | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* En-tête / logo */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-navy-700 px-5 py-4"
      >
        <Brand size={40} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-steel-100">
            CORE
          </p>
          <p className="label-tag !text-[0.58rem]">France Project</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {PRIMARY_NAV.map((entry) => {
          if (isGroup(entry)) {
            return (
              <NavGroupBlock
                key={entry.label}
                entry={entry}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            );
          }
          return (
            <LeafLink
              key={entry.href}
              item={entry}
              active={isActive(pathname, entry.href)}
              onNavigate={onNavigate}
            />
          );
        })}

        {/* Réseaux */}
        <div className="!mt-5 border-t border-navy-700 pt-4">
          <p className="label-tag px-3 pb-2">Réseaux</p>
          {EXTERNAL_NAV.map((ext) => {
            const Icon = ext.icon;
            return (
              <a
                key={ext.label}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-steel-300 transition-colors hover:bg-navy-800/60 hover:text-steel-100"
              >
                <Icon size={18} strokeWidth={1.75} className="shrink-0" />
                <span className="flex-1 truncate">{ext.label}</span>
                <ExternalLink size={13} className="text-steel-500" />
              </a>
            );
          })}
        </div>

        {/* Espace membre connecté */}
        {member && (
          <div className="!mt-5 border-t border-navy-700 pt-4">
            <p className="label-tag px-3 pb-2">Espace membre</p>
            {AUTH_NAV.map((item) => (
              <LeafLink
                key={item.label}
                item={item}
                active={!item.external && isActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}

        {/* Administration (sous-menu déroulant) */}
        {member && isAdmin(member) && (
          <div className="!mt-5 border-t border-navy-700 pt-4">
            <AdminGroup
              permissions={member.permissions}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </nav>

      {/* Pied de la sidebar (carré vide, pour l'aération) */}
      <div className="h-12 shrink-0 border-t border-navy-700" />
    </div>
  );
}

function NavGroupBlock({
  entry,
  pathname,
  onNavigate,
}: {
  entry: Extract<(typeof PRIMARY_NAV)[number], { children: NavLeaf[] }>;
  pathname: string;
  onNavigate?: () => void;
}) {
  const containsActive = entry.children.some((c) => isActive(pathname, c.href));
  const [open, setOpen] = useState(containsActive);
  const Icon = entry.icon;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          containsActive
            ? "text-gold-400"
            : "text-steel-300 hover:bg-navy-800/60 hover:text-steel-100",
        )}
        aria-expanded={open}
      >
        <Icon size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="flex-1 truncate text-left">{entry.label}</span>
        <ChevronDown
          size={16}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="mt-1 space-y-1">
          {entry.children.map((child) => (
            <LeafLink
              key={child.href}
              item={child}
              active={isActive(pathname, child.href)}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Groupe « Administration » déroulant, avec sous-sections filtrées par permission. */
function AdminGroup({
  permissions,
  pathname,
  onNavigate,
}: {
  permissions: string[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const children = ADMIN_SECTIONS.filter(
    (s) => s.perm === null || permissions.includes(s.perm),
  );
  const containsActive = pathname === "/admin" || pathname.startsWith("/admin/");
  const [open, setOpen] = useState(containsActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          containsActive
            ? "text-gold-400"
            : "text-steel-300 hover:bg-navy-800/60 hover:text-steel-100",
        )}
        aria-expanded={open}
      >
        <Settings size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="flex-1 truncate text-left">Administration</span>
        <ChevronDown
          size={16}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="mt-1 space-y-1">
          {children.map((child) => {
            const active =
              child.href === "/admin"
                ? pathname === "/admin"
                : pathname === child.href || pathname.startsWith(child.href + "/");
            return (
              <LeafLink
                key={child.href}
                item={child as NavLeaf}
                active={active}
                onNavigate={onNavigate}
                nested
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
