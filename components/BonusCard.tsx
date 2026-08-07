import type { Team } from "@/lib/types";
import { Card } from "./Card";
import { TeamAvatar } from "./TeamAvatar";

export function BonusCard({
  label,
  amount,
  pct,
  team,
  valueLabel,
  tbdReason,
}: {
  label: string;
  amount: number;
  pct: number;
  team: Team | undefined;
  valueLabel?: string;
  tbdReason: string;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink-100">
            {label}
          </p>
          <p className="text-xs text-ink-500">{pct}% of pool</p>
        </div>
        <p className="font-display text-2xl font-bold text-primary">
          ${amount}
        </p>
      </div>

      <div className="mt-4 border-t border-ink-700 pt-4">
        {team ? (
          <div className="flex items-center gap-3">
            <TeamAvatar src={team.avatarUrl} name={team.teamName} size={36} />
            <div>
              <p className="font-display font-bold text-ink-100">
                {team.teamName}
              </p>
              {valueLabel && (
                <p className="text-sm text-ink-400">{valueLabel}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            {tbdReason}
          </p>
        )}
      </div>
    </Card>
  );
}
