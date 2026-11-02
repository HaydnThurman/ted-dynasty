import { PAYOUTS, POOL_TOTAL, REGULAR_SEASON_WEEKS } from "@/config";
import { SectionHeading } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { LastUpdated } from "@/components/LastUpdated";
import { BonusCard } from "@/components/BonusCard";
import { getSiteData, teamByRosterId } from "@/lib/data";

export const metadata = { title: "Bonus Tracker | TED DYNASTY" };

export default async function BonusTrackerPage() {
  const { leagueConfigured, teams, bonusLeaders, finalPlacements } =
    await getSiteData();

  const sumCheck = PAYOUTS.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <SectionHeading
        eyebrow="Where the money's going"
        title="Bonus Tracker"
        subtitle={`Five ways to cash. Two update live off Sleeper and lock after week ${REGULAR_SEASON_WEEKS}, three get decided in the playoffs.`}
      />
      <div className="mb-6">
        <LastUpdated />
      </div>

      {!leagueConfigured ? (
        <EmptyState
          title="Bonus tracker is warming up"
          body="Connect the Sleeper LEAGUE_ID in config.ts and every bonus below starts computing itself, live, from matchup data."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAYOUTS.map((payout) => {
            if (payout.type === "final") {
              const rosterId =
                payout.key === "first"
                  ? finalPlacements.first
                  : payout.key === "second"
                    ? finalPlacements.second
                    : finalPlacements.third;
              return (
                <BonusCard
                  key={payout.key}
                  label={payout.label}
                  amount={payout.amount}
                  pct={payout.pct}
                  team={teamByRosterId(teams, rosterId)}
                  tbdReason="TBD — decided in playoffs"
                />
              );
            }

            if (payout.key === "most_points") {
              return (
                <BonusCard
                  key={payout.key}
                  label={payout.label}
                  amount={payout.amount}
                  pct={payout.pct}
                  team={teamByRosterId(
                    teams,
                    bonusLeaders?.mostPoints.rosterId ?? null
                  )}
                  valueLabel={`${bonusLeaders?.mostPoints.value.toFixed(1)} pts`}
                  tbdReason="No games played yet"
                />
              );
            }

            // reg_season_champ
            const rec = bonusLeaders?.regSeasonChamp;
            return (
              <BonusCard
                key={payout.key}
                label={payout.label}
                amount={payout.amount}
                pct={payout.pct}
                team={teamByRosterId(teams, rec?.rosterId ?? null)}
                valueLabel={
                  rec
                    ? `${rec.wins}-${rec.losses}${rec.ties ? `-${rec.ties}` : ""}`
                    : undefined
                }
                tbdReason="No games played yet"
              />
            );
          })}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-ink-700 bg-ink-800/40 p-5 text-sm text-ink-400">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-ink-500">
          Payout Breakdown
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {PAYOUTS.map((p) => (
            <li key={p.key} className="flex justify-between gap-4">
              <span>{p.label}</span>
              <span className="font-semibold text-ink-200">
                {p.pct}% &middot; ${p.amount}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-500">
          Total: ${sumCheck} of a ${POOL_TOTAL} pool.
        </p>
      </div>
    </div>
  );
}
