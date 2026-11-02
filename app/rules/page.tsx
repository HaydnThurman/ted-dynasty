import {
  BUY_IN,
  NUM_TEAMS,
  PAYOUTS,
  PLAYOFF_WEEK_START,
  POOL_TOTAL,
  REGULAR_SEASON_WEEKS,
} from "@/config";
import { SectionHeading, Card } from "@/components/Card";

export const metadata = { title: "Rules & Payouts | TED DYNASTY" };

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Read before you complain"
        title="Rules & Payouts"
      />

      <Card>
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
          Buy-In
        </h2>
        <p className="mt-2 text-ink-300">
          ${BUY_IN} per person &times; {NUM_TEAMS} teams = a ${POOL_TOTAL}{" "}
          pool.
        </p>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
          Payout Structure
        </h2>
        <ul className="mt-3 divide-y divide-ink-700">
          {PAYOUTS.map((p) => (
            <li key={p.key} className="flex items-center justify-between py-2.5">
              <div>
                <p className="font-semibold text-ink-100">{p.label}</p>
                <p className="text-xs uppercase tracking-wide text-ink-500">
                  {p.type === "final"
                    ? "Decided in playoffs"
                    : `Live, locks after week ${REGULAR_SEASON_WEEKS}`}
                </p>
              </div>
              <p className="font-display font-bold text-primary">
                {p.pct}% &middot; ${p.amount}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
          Playoff Format
        </h2>
        <p className="mt-2 text-ink-300">
          Regular season runs weeks 1&ndash;{REGULAR_SEASON_WEEKS}. Playoffs
          start week {PLAYOFF_WEEK_START} with the top 6 teams. 1st, 2nd, and
          3rd place are decided by the playoff bracket. The two regular-season
          bonuses (1st place and most points) lock after week{" "}
          {REGULAR_SEASON_WEEKS} &mdash; playoff games don&apos;t count toward
          them.
        </p>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
          The House Rule
        </h2>
        <p className="mt-2 text-ink-300">
          The league champion picks the league&apos;s jersey and color theme
          for the following season. No theme is set for this inaugural
          season &mdash; the first champion gets a blank slate.
        </p>
      </Card>
    </div>
  );
}
