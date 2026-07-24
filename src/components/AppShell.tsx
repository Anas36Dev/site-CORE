"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { SidebarNav } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { CurrentMember } from "@/lib/auth";

export function AppShell({
  member,
  children,
}: {
  member: CurrentMember | null;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Sidebar fixe (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-navy-700 bg-navy-900/70 backdrop-blur lg:block">
        <SidebarNav member={member} />
      </aside>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-navy-700 bg-navy-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-lg text-steel-300 hover:bg-navy-800 hover:text-steel-100"
              aria-label="Fermer le menu"
            >
              <X size={18} />
            </button>
            <SidebarNav member={member} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Colonne principale */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        <Header member={member} onOpenMenu={() => setDrawerOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
