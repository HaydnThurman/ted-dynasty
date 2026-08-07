import { SectionHeading } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { LastUpdated } from "@/components/LastUpdated";
import { StandingsTable } from "@/components/StandingsTable";
import { getSiteData } from "@/lib/data";

export const metadata = { title: "Standings | TED DYNASTY" };

export default async function StandingsPage() {
  const { leagueConfigured, standings } = await getSiteData();

  return (
    <div>
      <SectionHeading
        eyebrow="Live from Sleeper"
        title="Standings"
        subtitle="Ranked by record, tiebreak on points for. Updates automatically as scores come in."
      />
      <div className="mb-4">
        <LastUpdated />
      </div>

      {!leagueConfigured ? (
        <EmptyState
          title="No league connected yet"
          body="Standings will populate the moment the Sleeper LEAGUE_ID is set in config.ts and week 1 kicks off."
        />
      ) : standings.length === 0 ? (
        <EmptyState
          title="Rosters aren't in yet"
          body="Once the draft wraps and Sleeper generates rosters, every team will show up here."
        />
      ) : (
        <StandingsTable rows={standings} />
      )}
    </div>
  );
}
