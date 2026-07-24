import Link from "next/link";
import { ArrowRight, Users, FolderKanban, Images } from "lucide-react";

import { db } from "@/lib/db";
import { Brand } from "@/components/Brand";
import { HomeGallery } from "@/components/HomeGallery";

export const dynamic = "force-dynamic";

type HomeIntro = { badge?: string; title?: string; subtitle?: string };

export default async function Home() {
  const [introRow, gallery] = await Promise.all([
    db.content.findUnique({ where: { key: "home.intro" } }),
    db.galleryImage.findMany({ orderBy: [{ order: "asc" }] }),
  ]);
  const intro = (introRow?.value ?? {}) as HomeIntro;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 rounded-full bg-gold-500/10 blur-3xl" />
          <Brand size={128} />
        </div>

        <p className="label-tag mb-3">
          {intro.badge ?? "California Operational Roleplay Entity"}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-steel-100 sm:text-5xl">
          {intro.title ?? "CORE France Project"}
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-lg text-steel-300">
          {intro.subtitle ?? "Collectif RolePlay FiveM depuis 2019."}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/qui-sommes-nous"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Découvrir le projet
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Galerie (si des images ont été ajoutées) */}
      {gallery.length > 0 && <HomeGallery items={gallery} />}

      {/* Accès rapides */}
      <section className="mt-20">
        <p className="label-tag mb-4 text-center">Explorer le collectif</p>
        <div className="grid gap-4 sm:grid-cols-3">
        <QuickCard
          href="/equipe"
          icon={Users}
          title="Notre équipe"
        />
        <QuickCard
          href="/projets/legaux"
          icon={FolderKanban}
          title="Nos projets"
        />
        <QuickCard
          href="/realisations"
          icon={Images}
          title="Nos réalisations"
        />
        </div>
      </section>
    </div>
  );
}

function QuickCard({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: typeof Users;
  title: string;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="panel group flex flex-col gap-2 px-5 py-6 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60"
    >
      <span className="gold-hairline grid size-10 place-items-center rounded-lg bg-navy-800 text-gold-400">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h2 className="mt-2 flex items-center gap-1 text-base font-semibold text-steel-100">
        {title}
        <ArrowRight
          size={15}
          className="text-steel-500 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-400"
        />
      </h2>
      {desc && <p className="text-sm text-steel-300">{desc}</p>}
    </Link>
  );
}
