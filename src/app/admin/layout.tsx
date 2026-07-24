import { requireAdmin } from "@/lib/guard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Administration" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</div>
  );
}
