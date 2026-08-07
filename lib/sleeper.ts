import {
  LEAGUE_ID,
  REVALIDATE_SECONDS,
  SLEEPER_API_BASE,
  SLEEPER_CDN_BASE,
} from "@/config";
import type {
  SleeperBracketMatch,
  SleeperLeague,
  SleeperMatchupEntry,
  SleeperNflState,
  SleeperRoster,
  SleeperUser,
} from "./types";

async function sleeperGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SLEEPER_API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    return data;
  } catch {
    return null;
  }
}

export function hasLeague(): boolean {
  return LEAGUE_ID.trim().length > 0;
}

export async function getNflState(): Promise<SleeperNflState | null> {
  return sleeperGet<SleeperNflState>("/state/nfl");
}

export async function getLeague(): Promise<SleeperLeague | null> {
  if (!hasLeague()) return null;
  return sleeperGet<SleeperLeague>(`/league/${LEAGUE_ID}`);
}

export async function getUsers(): Promise<SleeperUser[]> {
  if (!hasLeague()) return [];
  const data = await sleeperGet<SleeperUser[]>(`/league/${LEAGUE_ID}/users`);
  return data ?? [];
}

export async function getRosters(): Promise<SleeperRoster[]> {
  if (!hasLeague()) return [];
  const data = await sleeperGet<SleeperRoster[]>(
    `/league/${LEAGUE_ID}/rosters`
  );
  return data ?? [];
}

export async function getMatchups(
  week: number
): Promise<SleeperMatchupEntry[]> {
  if (!hasLeague()) return [];
  const data = await sleeperGet<SleeperMatchupEntry[]>(
    `/league/${LEAGUE_ID}/matchups/${week}`
  );
  return data ?? [];
}

export async function getWinnersBracket(): Promise<SleeperBracketMatch[]> {
  if (!hasLeague()) return [];
  const data = await sleeperGet<SleeperBracketMatch[]>(
    `/league/${LEAGUE_ID}/winners_bracket`
  );
  return data ?? [];
}

export function avatarUrl(avatarId: string | null | undefined): string | null {
  if (!avatarId) return null;
  // Custom-uploaded avatars (e.g. user.metadata.avatar) come back as a full
  // CDN URL already; the short hash in user.avatar is the only case that
  // needs the /avatars/ prefix added.
  if (avatarId.startsWith("http")) return avatarId;
  return `${SLEEPER_CDN_BASE}/avatars/${avatarId}`;
}

const MAX_SEASON_WEEKS = 18;

/**
 * How many weeks of matchups to walk for the bonus tracker: everything up
 * through the current NFL week. Pre-season this resolves to 0, which leaves
 * every live bonus at its graceful empty state.
 */
export function resolveComputeWeek(state: SleeperNflState | null): number {
  if (!state) return 0;
  if (state.season_type === "pre") return 0;
  return Math.min(Math.max(state.week ?? 0, 0), MAX_SEASON_WEEKS);
}
