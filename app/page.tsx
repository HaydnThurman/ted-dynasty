import Image from "next/image";
import Link from "next/link";
import {
  DRAFT_DATE,
  LEAGUE_NAME,
  PLAYOFF_WEEK_START,
  POOL_TOTAL,
  SEASON,
  SLEEPER_INVITE_URL,
} from "@/config";
import { getSiteData, teamByRosterId } from "@/lib/data";
import { Countdown } from "@/components/Countdown";
import { Card } from "@/components/Card";
import { TeamAvatar } from "@/components/TeamAvatar";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { EmptyState } from "@/components/EmptyState";
import { LastUpdated } from "@/components/LastUpdated";
import { getLatestRecap } from "@/lib/recaps";

export default async function HomePage() {
  const { leagueConfigured, state, standings, bonusLeaders, teams } =
    await getSiteData();

  const draftHasPassed = Date.now() > new Date(DRAFT_DATE).getTime();
  const latestRecap = getLatestRecap();
  const leader = standings[0];
  const mostPointsTeam = teamByRosterId(
    teams,
    bonusLeaders?.mostPoints.rosterId ?? null
  );

  const isPlayoffs = (state?.week ?? 0) >= PLAYOFF_WEEK_START;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/40 p-6 sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <Image
            src="/ted-49ers-transparent.png"
            alt="Ted, patron saint of the league, in a burrito-adjacent pose"
            width={160}
            height={160}
            className="mx-auto h-32 w-32 rounded-full border-4 border-primary object-cover object-[50%_10%] shadow-glow sm:h-40 sm:w-40 md:mx-0"
            priority
          />
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {SEASON} Season
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold uppercase leading-none tracking-tight text-ink-100 sm:text-6xl">
              {LEAGUE_NAME}
            </h1>
            <p className="mt-3 max-w-xl text-ink-300">
              Ten owners. One burrito-fueled dynasty. Every win, streak, and
              bragging right is tracked live — Ted is watching.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={SLEEPER_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 shadow-glow transition-transform hover:scale-105"
              >
                Join the League
              </a>
              <Link
                href="/standings"
                className="rounded-full border border-ink-600 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink-100 transition-colors hover:border-primary hover:text-primary"
              >
                View Standings
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-ink-900/60 p-5">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-ink-400">
              {draftHasPassed ? "Current Status" : "Draft Countdown"}
            </p>
            {draftHasPassed ? (
              <div className="mt-3">
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  {state
                    ? isPlayoffs
                      ? `Playoffs — Week ${state.week}`
                      : `Week ${state.week}`
                    : "Offseason"}
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  {isPlayoffs
                    ? "Top 6 teams battling it out."
                    : "Regular season is underway."}
                </p>
              </div>
            ) : (
              <div className="mt-3">
                <Countdown target={DRAFT_DATE} />
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-ink-900/60 p-5">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-ink-400">
              Total Pot
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">
              <AnimatedNumber value={POOL_TOTAL} prefix="$" />
            </p>
            <p className="mt-1 text-sm text-ink-400">
              Winner take-most, five ways to cash. See{" "}
              <Link href="/rules" className="underline hover:text-primary">
                the full breakdown
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Snapshot cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-ink-100">
            League Snapshot
          </h2>
          <LastUpdated />
        </div>

        {!leagueConfigured ? (
          <EmptyState
            title="Sleeper league not connected yet"
            body="Once the LEAGUE_ID is dropped into config.ts, standings and bonus leaders will show up here automatically."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                #1 in Standings
              </p>
              {leader ? (
                <div className="mt-3 flex items-center gap-3">
                  <TeamAvatar src={leader.avatarUrl} name={leader.teamName} />
                  <div>
                    <p className="font-display font-bold text-ink-100">
                      {leader.teamName}
                    </p>
                    <p className="text-sm text-ink-400">
                      {leader.wins}-{leader.losses}
                      {leader.ties ? `-${leader.ties}` : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-400">
                  Standings kick off once week 1 is in the books.
                </p>
              )}
            </Card>

            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Most Points Leader
              </p>
              {mostPointsTeam ? (
                <div className="mt-3 flex items-center gap-3">
                  <TeamAvatar
                    src={mostPointsTeam.avatarUrl}
                    name={mostPointsTeam.teamName}
                  />
                  <div>
                    <p className="font-display font-bold text-ink-100">
                      {mostPointsTeam.teamName}
                    </p>
                    <p className="text-sm text-ink-400">
                      {bonusLeaders?.mostPoints.value.toFixed(1)} pts
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-400">
                  Nobody&apos;s put up a point yet. Give it a week.
                </p>
              )}
            </Card>

            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Latest Recap
              </p>
              {latestRecap ? (
                <div className="mt-3">
                  <p className="font-display font-bold text-ink-100">
                    Week {latestRecap.week}: {latestRecap.title}
                  </p>
                  <p className="mt-1 line-clamp-3 text-sm text-ink-400">
                    {latestRecap.body}
                  </p>
                  <Link
                    href="/recaps"
                    className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Read more &rarr;
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-400">
                  No recaps yet — the trash talk starts week 1.
                </p>
              )}
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}
