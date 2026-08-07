import { LEAGUE_NAME, SEASON } from "@/config";

export function Footer() {
  return (
    <footer className="border-t border-ink-700 py-8 text-center">
      <p className="font-display text-xs uppercase tracking-widest text-ink-400">
        {LEAGUE_NAME} &middot; {SEASON} Season
      </p>
      <p className="mt-1 text-xs text-ink-500">
        Built on Sleeper. Ted did not authorize this burrito.
      </p>
    </footer>
  );
}
