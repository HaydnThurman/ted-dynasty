import {
  getBonusLeaders,
  getWeeklyScores,
  computeCurrentStreaks,
  resolveFinalPlacements,
} from "./bonus";
import {
  getNflState,
  getRosters,
  getUsers,
  getWinnersBracket,
  hasLeague,
  resolveComputeWeek,
} from "./sleeper";
import { buildStandings, buildTeams } from "./teams";
import type {
  BonusLeaders,
  FinalPlacements,
  SleeperNflState,
  StandingsRow,
  Team,
} from "./types";

export interface SiteData {
  leagueConfigured: boolean;
  state: SleeperNflState | null;
  computeWeek: number;
  teams: Team[];
  standings: StandingsRow[];
  bonusLeaders: BonusLeaders | null;
  finalPlacements: FinalPlacements;
}

const EMPTY_PLACEMENTS: FinalPlacements = { first: null, second: null, third: null };

/** Single aggregator so every page pulls the same shape of Sleeper-derived data. */
export async function getSiteData(): Promise<SiteData> {
  const leagueConfigured = hasLeague();
  const state = await getNflState();
  const computeWeek = resolveComputeWeek(state);

  if (!leagueConfigured) {
    return {
      leagueConfigured,
      state,
      computeWeek,
      teams: [],
      standings: [],
      bonusLeaders: null,
      finalPlacements: EMPTY_PLACEMENTS,
    };
  }

  const [users, rosters, weeklyScores, bracket] = await Promise.all([
    getUsers(),
    getRosters(),
    getWeeklyScores(computeWeek),
    getWinnersBracket(),
  ]);

  const teams = buildTeams(users, rosters);
  const currentStreaks = computeCurrentStreaks(weeklyScores);
  const standings = buildStandings(teams, currentStreaks);
  const bonusLeaders = teams.length
    ? getBonusLeaders(weeklyScores, teams)
    : null;
  const finalPlacements = resolveFinalPlacements(bracket);

  return {
    leagueConfigured,
    state,
    computeWeek,
    teams,
    standings,
    bonusLeaders,
    finalPlacements,
  };
}

export function teamByRosterId(
  teams: Team[],
  rosterId: number | null
): Team | undefined {
  if (rosterId === null) return undefined;
  return teams.find((t) => t.rosterId === rosterId);
}
