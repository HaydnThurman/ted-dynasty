import { REGULAR_SEASON_WEEKS } from "@/config";
import { getMatchups } from "./sleeper";
import type {
  BonusLeaders,
  FinalPlacements,
  SleeperBracketMatch,
  Team,
  WeeklyScore,
} from "./types";

/**
 * Walks matchup weeks 1..upToWeek and flattens them into per-team weekly
 * scores with win/loss/tie decisions. Weeks with no data (pre-season, or a
 * bye) simply contribute nothing — callers must not treat that as a loss.
 *
 * We compute win/loss/points straight from matchup data rather than trusting
 * roster.settings.fpts, since that's the only way to be sure playoff weeks
 * (15+) are included and correctly attributed per the league's top-6 bracket.
 */
export async function getWeeklyScores(upToWeek: number): Promise<WeeklyScore[]> {
  const weeks = Array.from({ length: Math.max(upToWeek, 0) }, (_, i) => i + 1);
  const perWeek = await Promise.all(weeks.map((w) => getMatchups(w)));

  const scores: WeeklyScore[] = [];

  perWeek.forEach((entries, idx) => {
    const week = idx + 1;
    if (!entries || entries.length === 0) return;

    const byMatchupId = new Map<number, typeof entries>();
    for (const entry of entries) {
      if (entry.matchup_id == null) continue;
      const group = byMatchupId.get(entry.matchup_id) ?? [];
      group.push(entry);
      byMatchupId.set(entry.matchup_id, group);
    }

    for (const group of byMatchupId.values()) {
      if (group.length === 2) {
        const [a, b] = group;
        const aPts = a.points ?? 0;
        const bPts = b.points ?? 0;
        const tie = aPts === bPts;
        scores.push({
          rosterId: a.roster_id,
          week,
          points: aPts,
          won: tie ? null : aPts > bPts,
        });
        scores.push({
          rosterId: b.roster_id,
          week,
          points: bPts,
          won: tie ? null : bPts > aPts,
        });
      } else {
        // Bye / unmatched entry (can happen in an uneven bracket week) —
        // points still count, but there's no win/loss decision to record.
        for (const entry of group) {
          scores.push({
            rosterId: entry.roster_id,
            week,
            points: entry.points ?? 0,
            won: null,
          });
        }
      }
    }
  });

  return scores;
}

export function computeMostPoints(scores: WeeklyScore[]) {
  const totals = new Map<number, number>();
  for (const s of scores) {
    totals.set(s.rosterId, (totals.get(s.rosterId) ?? 0) + s.points);
  }
  let leader: { rosterId: number | null; value: number } = {
    rosterId: null,
    value: 0,
  };
  for (const [rosterId, value] of totals) {
    if (value > leader.value || leader.rosterId === null) {
      leader = { rosterId, value };
    }
  }
  return leader;
}

/** Current (most-recent) streak per team, e.g. "W3" / "L1" / "-" for the standings table. */
export function computeCurrentStreaks(scores: WeeklyScore[]): Map<number, string> {
  const byTeam = new Map<number, WeeklyScore[]>();
  for (const s of scores) {
    const list = byTeam.get(s.rosterId) ?? [];
    list.push(s);
    byTeam.set(s.rosterId, list);
  }

  const result = new Map<number, string>();
  for (const [rosterId, list] of byTeam) {
    list.sort((a, b) => b.week - a.week); // newest first
    const decided = list.filter((s) => s.won !== null);
    if (decided.length === 0) {
      result.set(rosterId, "-");
      continue;
    }
    const latest = decided[0].won;
    let count = 0;
    for (const s of decided) {
      if (s.won === latest) count++;
      else break;
    }
    result.set(rosterId, `${latest ? "W" : "L"}${count}`);
  }
  return result;
}

/**
 * Regular-season 1st place comes straight from Sleeper's roster record. That
 * record only covers the regular season and includes the league's vs-median
 * games (two results per week), which matchup data alone can't reproduce.
 * Points-for breaks ties, matching Sleeper's standings order.
 */
export function computeRegSeasonChamp(teams: Team[]) {
  let leader = { rosterId: null as number | null, wins: 0, losses: 0, ties: 0 };
  let leaderPts = 0;
  const winPct = (w: number, t: number) => w + t / 2;
  for (const t of teams) {
    const better =
      leader.rosterId === null ||
      winPct(t.wins, t.ties) > winPct(leader.wins, leader.ties) ||
      (winPct(t.wins, t.ties) === winPct(leader.wins, leader.ties) &&
        t.fptsFor > leaderPts);
    if (better) {
      leader = { rosterId: t.rosterId, wins: t.wins, losses: t.losses, ties: t.ties };
      leaderPts = t.fptsFor;
    }
  }
  return leader;
}

/** Both cash bonuses are regular-season only — playoff weeks are ignored. */
export function getBonusLeaders(
  scores: WeeklyScore[],
  teams: Team[]
): BonusLeaders {
  const regSeason = scores.filter((s) => s.week <= REGULAR_SEASON_WEEKS);
  const weeksComputed = new Set(regSeason.map((s) => s.week)).size;

  return {
    mostPoints: computeMostPoints(regSeason),
    regSeasonChamp: computeRegSeasonChamp(teams),
    weeksComputed,
  };
}

/**
 * Reads final placements off Sleeper's winners bracket. The championship
 * game is the entry with p=1 (winner=1st, loser=2nd); the third-place game
 * is p=3 (winner=3rd). Until those games have a recorded winner, placements
 * stay null and the UI shows "TBD — decided in playoffs".
 */
export function resolveFinalPlacements(
  bracket: SleeperBracketMatch[]
): FinalPlacements {
  const championship = bracket.find((m) => m.p === 1);
  const thirdPlaceGame = bracket.find((m) => m.p === 3);

  return {
    first: championship?.w ?? null,
    second: championship?.l ?? null,
    third: thirdPlaceGame?.w ?? null,
  };
}
