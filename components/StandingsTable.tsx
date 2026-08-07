import type { StandingsRow } from "@/lib/types";
import { TeamAvatar } from "./TeamAvatar";

export function StandingsTable({ rows }: { rows: StandingsRow[] }) {
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-ink-700">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800/60 text-left text-xs uppercase tracking-widest text-ink-400">
            <th className="px-4 py-3 font-display">Rank</th>
            <th className="px-4 py-3 font-display">Team</th>
            <th className="px-4 py-3 font-display">Owner(s)</th>
            <th className="px-4 py-3 text-center font-display">W-L-T</th>
            <th className="px-4 py-3 text-right font-display">PF</th>
            <th className="px-4 py-3 text-right font-display">PA</th>
            <th className="px-4 py-3 text-center font-display">Streak</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.rosterId}
              className="border-b border-ink-800 last:border-0 hover:bg-ink-800/40"
            >
              <td className="px-4 py-3 font-display font-bold text-ink-300">
                {row.rank}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <TeamAvatar src={row.avatarUrl} name={row.teamName} size={32} />
                  <span className="font-semibold text-ink-100">
                    {row.teamName}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-ink-400">
                {row.ownerNames.join(" & ")}
              </td>
              <td className="px-4 py-3 text-center tabular-nums text-ink-200">
                {row.wins}-{row.losses}
                {row.ties ? `-${row.ties}` : ""}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-200">
                {row.fptsFor.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-400">
                {row.fptsAgainst.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    row.streak.startsWith("W")
                      ? "bg-accent/20 text-accent"
                      : row.streak.startsWith("L")
                        ? "bg-red-500/20 text-red-400"
                        : "bg-ink-700 text-ink-400"
                  }`}
                >
                  {row.streak}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
