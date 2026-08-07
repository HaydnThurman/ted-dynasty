// Sleeper API response shapes (public, unauthenticated). Verified against
// https://docs.sleeper.com — only the fields this app actually reads are
// typed here.

export interface SleeperNflState {
  week: number;
  season: string;
  season_type: "pre" | "regular" | "post" | string;
  leg: number;
  display_week?: number;
}

export interface SleeperLeague {
  league_id: string;
  name: string;
  season: string;
  status: string;
  avatar: string | null;
  settings: {
    playoff_week_start?: number;
    num_teams?: number;
    leg?: number;
  };
}

export interface SleeperUser {
  user_id: string;
  display_name: string;
  avatar: string | null;
  metadata?: {
    team_name?: string;
    avatar?: string;
  } | null;
}

export interface SleeperRoster {
  roster_id: number;
  owner_id: string | null;
  co_owners?: string[] | null;
  settings: {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_decimal?: number;
    fpts_against: number;
    fpts_against_decimal?: number;
  };
}

export interface SleeperMatchupEntry {
  roster_id: number;
  matchup_id: number | null;
  points: number | null;
}

// The winners bracket. Entries with `p` set are placement games: p=1 is the
// championship (winner = 1st, loser = 2nd), p=3 is the third-place game
// (winner = 3rd). Entries without `p` are earlier bracket rounds.
export interface SleeperBracketMatch {
  r: number;
  m: number;
  t1: number | null;
  t2: number | null;
  w: number | null;
  l: number | null;
  p?: number;
}

// ---------------------------------------------------------------------------
// App-level derived shapes
// ---------------------------------------------------------------------------

export interface Team {
  rosterId: number;
  teamName: string;
  ownerNames: string[];
  avatarUrl: string | null;
  wins: number;
  losses: number;
  ties: number;
  fptsFor: number;
  fptsAgainst: number;
}

export interface StandingsRow extends Team {
  rank: number;
  streak: string; // e.g. "W3", "L1", "-"
}

export interface WeeklyScore {
  rosterId: number;
  week: number;
  points: number;
  won: boolean | null; // null = tie or unknown
}

export interface BonusLeaders {
  mostPoints: { rosterId: number | null; value: number };
  bestRecord: { rosterId: number | null; wins: number; losses: number; ties: number };
  winStreak: { rosterId: number | null; length: number };
  highWeek: { rosterId: number | null; value: number; week: number | null };
  weeksComputed: number;
}

export interface FinalPlacements {
  first: number | null;
  second: number | null;
  third: number | null;
}
