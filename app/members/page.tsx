import { MEMBERS } from "@/config";
import { SectionHeading } from "@/components/Card";
import { TeamAvatar } from "@/components/TeamAvatar";

export const metadata = { title: "Members | TED DYNASTY" };

export default function MembersPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="The Twelve"
        title="Members & Teams"
        subtitle="Real team names land here once everyone sets one up on Sleeper. Until then, it's just owners."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((member) => {
          const displayName = member.coOwner
            ? `${member.name} & ${member.coOwner}`
            : member.name;
          return (
            <div
              key={displayName}
              className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-800/40 p-5"
            >
              <TeamAvatar src={null} name={member.name} size={52} />
              <div>
                <p className="font-display font-bold text-ink-100">
                  {displayName}
                </p>
                <p className="text-sm text-ink-500">
                  {member.coOwner ? "Co-owned team" : "Owner"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
