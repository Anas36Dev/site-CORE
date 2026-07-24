import { CalendarDays } from "lucide-react";

import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { MemberMarks, StatusBadge } from "@/components/Seniority";
import { ParticipationsList, type ParticipationData } from "@/components/ParticipationsList";
import { ORIENTATION, formatDate, serviceYears } from "@/lib/labels";

type ProfileMember = {
  pseudo: string;
  avatarUrl: string | null;
  discordAvatarUrl: string | null;
  discordGlobalName: string | null;
  discordUsername: string | null;
  title: string | null;
  role: string;
  status: string;
  orientation: string;
  joinedAt: Date | null;
  description: string | null;
  groups: unknown;
  participations: ParticipationData[];
};

/** Bloc profil partagé entre « Mon compte » et la fiche publique (visuel uniforme). */
export function MemberProfile({
  member,
  serverLogos,
  serverSlugs,
}: {
  member: ProfileMember;
  serverLogos?: Record<string, string | null>;
  serverSlugs?: Record<string, string>;
}) {
  const ori = ORIENTATION[member.orientation];
  const joined = formatDate(member.joinedAt);
  const years = serviceYears(member.joinedAt);
  const discordName = member.discordGlobalName
    ? `${member.discordGlobalName} (${member.discordUsername ?? member.pseudo})`
    : null;

  return (
    <div className="space-y-4">
      {/* Carte profil */}
      <section className="panel flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-start">
        <Avatar
          src={member.avatarUrl}
          discordSrc={member.discordAvatarUrl}
          name={member.pseudo}
          size={96}
        />
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-xl font-semibold text-steel-100">
            {member.pseudo}
            <MemberMarks
              role={member.role}
              groups={member.groups}
              joinedAt={member.joinedAt}
              status={member.status}
              size={17}
              expand
            />
          </h1>
          {discordName && <p className="text-sm text-steel-500">{discordName}</p>}
          {member.title && <p className="mt-0.5 text-sm text-gold-400">{member.title}</p>}

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone={member.role === "FONDATEUR" ? "gold" : "steel"}>
              {member.role === "FONDATEUR" ? "Fondateur" : "Membre"}
            </Badge>
            <StatusBadge joinedAt={member.joinedAt} status={member.status} />
            {ori?.label && member.orientation !== "AUCUNE" && (
              <Badge tone={ori.tone}>{ori.label}</Badge>
            )}
          </div>

          {member.description && (
            <p className="mt-3 text-sm italic text-steel-300">
              «&nbsp;{member.description}&nbsp;»
            </p>
          )}
        </div>
      </section>

      {/* Ancienneté */}
      <section className="panel px-6 py-5">
        <p className="label-tag mb-3">Ancienneté</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {joined && (
            <span className="inline-flex items-center gap-1.5 text-sm text-steel-300">
              <CalendarDays size={15} className="text-gold-400" />
              Depuis le {joined}
            </span>
          )}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden>
              {Array.from({ length: Math.max(years, 1) }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < years
                      ? "h-5 w-2 -skew-x-[20deg] rounded-[2px] bg-gold-500"
                      : "h-5 w-2 -skew-x-[20deg] rounded-[2px] bg-navy-700"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-steel-100">
              {years > 0 ? `${years} an${years > 1 ? "s" : ""} de service` : "Moins d'un an"}
            </span>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="panel px-6 py-5">
        <p className="label-tag mb-3">Parcours</p>
        <ParticipationsList
          participations={member.participations}
          serverLogos={serverLogos}
          serverSlugs={serverSlugs}
        />
      </section>
    </div>
  );
}
