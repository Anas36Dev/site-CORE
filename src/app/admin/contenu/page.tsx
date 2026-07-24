import { Plus } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { Field, Input, PrimaryButton, AdminHeader } from "@/components/admin/ui";
import { AdminServerList } from "@/components/admin/AdminServerList";
import { AdminGalleryList } from "@/components/admin/AdminGalleryList";
import { addServer, addGallery } from "./actions";

export const dynamic = "force-dynamic";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel px-5 py-5">
      <h2 className="mb-4 text-base font-semibold text-steel-100">{title}</h2>
      {children}
    </section>
  );
}

export default async function AdminContenuPage() {
  await requirePermission("GESTION_CONTENU");

  const [servers, gallery] = await Promise.all([
    db.partnerServer.findMany({ orderBy: [{ name: "asc" }] }),
    db.galleryImage.findMany({ orderBy: [{ order: "asc" }] }),
  ]);

  return (
    <div className="space-y-6">
      <AdminHeader title="Contenu" description="Serveurs hôtes et galerie d'accueil." />

      {/* Serveurs hôtes */}
      <Section title={`Serveurs hôtes (${servers.length})`}>
        <AdminServerList
          servers={servers.map((s) => ({
            id: s.id,
            name: s.name,
            logoUrl: s.logoUrl,
            isClosed: s.isClosed,
          }))}
        />
        <form action={addServer} className="flex flex-wrap items-end gap-3 border-t border-navy-700 pt-4">
          <Field label="Nom du serveur">
            <Input name="name" required />
          </Field>
          <Field label="Logo (optionnel)">
            <Input name="logoUrl" placeholder="/images/serveurs/anesya.png" />
          </Field>
          <PrimaryButton type="submit">
            <Plus size={16} /> Ajouter
          </PrimaryButton>
        </form>
      </Section>

      {/* Galerie */}
      <Section title={`Galerie d'accueil (${gallery.length})`}>
        {gallery.length > 0 && (
          <AdminGalleryList
            items={gallery.map((g) => ({
              id: g.id,
              imageUrl: g.imageUrl,
              caption: g.caption,
            }))}
          />
        )}
        <form action={addGallery} className="flex flex-wrap items-end gap-3 border-t border-navy-700 pt-4">
          <Field label="Image" hint="Chemin dans public/images/galerie/ ou URL.">
            <Input name="imageUrl" required placeholder="/images/galerie/scene1.jpg" />
          </Field>
          <Field label="Légende (optionnel)">
            <Input name="caption" />
          </Field>
          <PrimaryButton type="submit">
            <Plus size={16} /> Ajouter
          </PrimaryButton>
        </form>
      </Section>
    </div>
  );
}
