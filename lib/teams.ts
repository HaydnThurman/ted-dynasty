import type { SleeperRoster, SleeperUser, StandingsRow, Team } from "./types";
import { avatarUrl } from "./sleeper";

function decimalPoints(whole: number, decimal?: number): number {
  return whole + (decimal ?? 0) / 100;
}

/** Joins Sleeper rosters + users into the app's Team shape. Pure Sleeper data — no config matching required. */
export function buildTeams(
  users: SleeperUser[],
  rosters: SleeperRoster[]
): Team[] {
  const usersById = new Map(users.map((u) => [u.user_id, u]));

  return rosters.map((roster) => {
    const owner = roster.owner_id ? usersById.get(roster.owner_id) : undefined;
    const coOwners = (roster.co_owners ?? [])
      .map((id) => usersById.get(id))
      .filter((u): u is SleeperUser => Boolean(u));

    const ownerNames = [owner, ...coOwners]
      .filter((u): u is SleeperUser => Boolean(u))
      .map((u) => u.display_name);

    const teamName =
      owner?.metadata?.team_name?.trim() ||
      owner?.display_name ||
      `Team ${roster.roster_id}`;

    return {
      rosterId: roster.roster_id,
      teamName,
      ownerNames: ownerNames.length ? ownerNames : ["Unclaimed"],
      avatarUrl: avatarUrl(owner?.metadata?.avatar || owner?.avatar),
      wins: roster.settings.wins ?? 0,
      losses: roster.settings.losses ?? 0,
      ties: roster.settings.ties ?? 0,
      fptsFor: decimalPoints(
        roster.settings.fpts ?? 0,
        roster.settings.fpts_decimal
      ),
      fptsAgainst: decimalPoints(
        roster.settings.fpts_against ?? 0,
        roster.settings.fpts_against_decimal
      ),
    };
  });
}

/** Ranks teams by wins, then points for — the standard standings sort. */
export function buildStandings(
  teams: Team[],
  currentStreaks: Map<number, string>
): StandingsRow[] {
  const sorted = [...teams].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.fptsFor - a.fptsFor;
  });

  return sorted.map((team, idx) => ({
    ...team,
    rank: idx + 1,
    streak: currentStreaks.get(team.rosterId) ?? "-",
  }));
}
