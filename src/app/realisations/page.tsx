import { Images } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";
import { RealisationsGallery } from "@/components/RealisationsGallery";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nos réalisations" };

export default async function RealisationsPage() {
  const rows = await db.realisation.findMany({ orderBy: [{ order: "asc" }] });
  const items = rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    imageUrl: r.imageUrl,
    author: r.author,
    externalUrl: r.externalUrl,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <PageHeader
        icon={Images}
        title="Nos réalisations"
        subtitle="Les créations du collectif : affiches, logos, documents et dossiers."
      />
      <RealisationsGallery items={items} />
    </div>
  );
}
