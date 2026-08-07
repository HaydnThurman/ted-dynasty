// ---------------------------------------------------------------------------
// TED DYNASTY — league config
// This is the one file you should need to touch season-to-season.
// Nothing else in the app should hardcode these values.
// ---------------------------------------------------------------------------

/**
 * Your Sleeper league ID (numeric string), NOT the invite code.
 * Find it in the Sleeper app: League -> Settings, or in the URL when viewing
 * your league on sleeper.com: sleeper.com/leagues/<LEAGUE_ID>
 * Leave blank and the site will render with placeholder/pre-season data.
 */
export const LEAGUE_ID = "1391586050798796800";

export const SEASON = "2026";

export const BUY_IN = 100;
export const NUM_TEAMS = 12;
export const POOL_TOTAL = BUY_IN * NUM_TEAMS;

/** Public Google Form URL (the "Send" / viewform link — not the /edit link). */
export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScatqI_eODUxKZjj-HiY-l2W4TsqHlAaie967tmnBpvzPbnhA/viewform";

/** Sleeper league invite link, shown on the Join page as a secondary CTA. */
export const SLEEPER_INVITE_URL = "https://sleeper.com/i/Y288Yokmq3BKN";

/** ISO 8601 with offset — Sept 3, 2026, 7:30 PM Mountain (MDT = UTC-6). */
export const DRAFT_DATE = "2026-09-03T19:30:00-06:00";

/**
 * Regular season is weeks 1-14. Playoffs start week 15 with the top 6 teams.
 * Used by the bonus tracker to know how far to walk matchup weeks and to
 * avoid treating a missing playoff week as a loss for eliminated teams.
 */
export const PLAYOFF_WEEK_START = 15;
export const REGULAR_SEASON_WEEKS = 14;

/**
 * The league champion picks next year's jersey/colors — the theme lives here
 * so it's swappable each season by editing these three values. This is the
 * neutral inaugural look; NOT tied to any real NFL team.
 */
export const THEME = {
  primary: "#D4AF37", // trophy gold accent
  accent: "#3A7D44", // field green
  bg: "dark" as const, // charcoal / slate base
};

export type PayoutKey =
  | "first"
  | "second"
  | "third"
  | "most_points"
  | "best_record"
  | "win_streak"
  | "high_week";

export interface Payout {
  key: PayoutKey;
  label: string;
  pct: number;
  amount: number;
  type: "final" | "live";
}

export const PAYOUTS: Payout[] = [
  { key: "first", label: "1st Place", pct: 50, amount: 600, type: "final" },
  { key: "second", label: "2nd Place", pct: 20, amount: 240, type: "final" },
  { key: "third", label: "3rd Place", pct: 10, amount: 120, type: "final" },
  {
    key: "most_points",
    label: "Most Points Scored",
    pct: 5,
    amount: 60,
    type: "live",
  },
  {
    key: "best_record",
    label: "Best Record",
    pct: 5,
    amount: 60,
    type: "live",
  },
  {
    key: "win_streak",
    label: "Longest Win Streak",
    pct: 5,
    amount: 60,
    type: "live",
  },
  {
    key: "high_week",
    label: "Most Points, One Week",
    pct: 5,
    amount: 60,
    type: "live",
  },
];

export interface Member {
  name: string;
  /** Co-owners of a single team show up as one card with both names. */
  coOwner?: string;
}

export const MEMBERS: Member[] = [
  { name: "Haydn Thurman" },
  { name: "Scott Thurman" },
  { name: "Will Samrick" },
  { name: "Brian Samrick" },
  { name: "Matt Braun" },
  { name: "Uncle Drew", coOwner: "Nico Flocchini" },
  { name: "Quinn Breeden" },
  { name: "Chuck Breeden" },
  { name: "Cole Bricca" },
  { name: "Ethan Goode" },
  { name: "Ethan Goode's Dad" },
  { name: "Jason Bissey" },
];

export const LEAGUE_NAME = "TED DYNASTY";

export const SLEEPER_API_BASE = "https://api.sleeper.app/v1";
export const SLEEPER_CDN_BASE = "https://sleepercdn.com";

/** How long Sleeper responses stay cached on the server, in seconds. */
export const REVALIDATE_SECONDS = 300;
