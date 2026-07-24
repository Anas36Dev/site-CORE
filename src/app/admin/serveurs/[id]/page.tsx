import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, Field, Input, PrimaryButton, LinkButton } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { LogoInput } from "@/components/admin/LogoInput";
import { updateServer, deleteServer } from "@/app/admin/contenu/actions";

export const dynamic = "force-dynamic";

export default async function EditServeurPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("GESTION_CONTENU");
  const { id } = await params;
  const server = await db.partnerServer.findUnique({ where: { id: Number(id) } });
  if (!server) notFound();

  return (
    <div>
      <AdminHeader
        title={`Serveur — ${server.name}`}
        action={
          <form action={deleteServer}>
            <input type="hidden" name="id" value={server.id} />
            <ConfirmButton message={`Supprimer le serveur ${server.name} ?`}>
              <Trash2 size={15} />
              Supprimer
            </ConfirmButton>
          </form>
        }
      />

      <form action={updateServer} className="max-w-2xl space-y-5">
        <input type="hidden" name="id" value={server.id} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom du serveur" htmlFor="name">
            <Input id="name" name="name" defaultValue={server.name} required />
          </Field>
          <Field label="Fondateur(s)" htmlFor="founders">
            <Input id="founders" name="founders" defaultValue={server.founders ?? ""} placeholder="anas36, Tom Los…" />
          </Field>
          <Field label="Joueurs / jour (tranche)" htmlFor="playersRange">
            <Input id="playersRange" name="playersRange" defaultValue={server.playersRange ?? ""} placeholder="50-100" />
          </Field>
          <Field label="Lien Discord" htmlFor="discordUrl">
            <Input id="discordUrl" name="discordUrl" defaultValue={server.discordUrl ?? ""} placeholder="https://discord.gg/…" />
          </Field>
          <Field label="Lien connexion FiveM" htmlFor="fivemUrl">
            <Input id="fivemUrl" name="fivemUrl" defaultValue={server.fivemUrl ?? ""} placeholder="https://cfx.re/join/…" />
          </Field>
        </div>

        <Field label="Logo du serveur" hint="Chemin dans public/images/serveurs/ ou URL. Aperçu à droite.">
          <LogoInput name="logoUrl" defaultValue={server.logoUrl} placeholder="/images/serveurs/anesya.png" />
        </Field>

        <label className="flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm text-steel-300 ring-1 ring-navy-600">
          <input type="checkbox" name="isClosed" defaultChecked={server.isClosed} className="accent-crimson-500" />
          Serveur fermé / n'existe plus (bandeau rouge, pas de redirection FiveM)
        </label>

        <div className="flex items-center gap-3 border-t border-navy-700 pt-5">
          <PrimaryButton type="submit">Enregistrer</PrimaryButton>
          <LinkButton href="/admin/contenu">Annuler</LinkButton>
        </div>
      </form>
    </div>
  );
}
