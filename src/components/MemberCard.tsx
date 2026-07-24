import Link from "next/link";

import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { MemberMarks, StatusBadge } from "@/components/Seniority";
import { ORIENTATION } from "@/lib/labels";

export type MemberCardData = {
  slug: string;
  pseudo: string;
  avatarUrl: string | null;
  discordAvatarUrl: string | null;
  title: string | null;
  role: string;
  status: string;
  orientation: string;
  description: string | null;
  joinedAt: Date | null;
  groups: unknown;
};

export function MemberCard({
  member,
  showOrientation = true,
}: {
  member: MemberCardData;
  showOrientation?: boolean;
}) {
  const ori = ORIENTATION[member.orientation];
  const subtitle =
    member.title ?? (member.role === "FONDATEUR" ? "Fondateur" : "Membre");

  return (
    <Link
      href={`/membres/${member.slug}`}
      className="panel group flex min-w-0 items-center gap-3 px-4 py-3 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60"
    >
      <Avatar
        src={member.avatarUrl}
        discordSrc={member.discordAvatarUrl}
        name={member.pseudo}
        size={44}
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate font-semibold text-steel-100 group-hover:text-gold-400">
          <span className="truncate">{member.pseudo}</span>
          <MemberMarks
            role={member.role}
            groups={member.groups}
            joinedAt={member.joinedAt}
            status={member.status}
          />
        </p>
        <p className="truncate text-xs text-steel-500">{subtitle}</p>
        {member.description && (
          <p className="mt-0.5 truncate pr-3 text-xs italic text-steel-500">
            «&nbsp;{member.description}&nbsp;»
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        {showOrientation && ori?.label && member.orientation !== "AUCUNE" && (
          <Badge tone={ori.tone}>{ori.label}</Badge>
        )}
        <StatusBadge joinedAt={member.joinedAt} status={member.status} />
      </div>
    </Link>
  );
}
