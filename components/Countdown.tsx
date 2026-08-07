"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  };
}

const UNITS: Array<[keyof ReturnType<typeof getTimeLeft>, string]> = [
  ["days", "Days"],
  ["hours", "Hrs"],
  ["minutes", "Min"],
  ["seconds", "Sec"],
];

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetMs));
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!mounted) {
    // Avoid a server/client mismatch flash — render static zeros until hydrated.
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {UNITS.map(([, label]) => (
          <div key={label} className="rounded-xl bg-ink-800 px-2 py-3 text-center sm:px-4 sm:py-5">
            <div className="font-display text-2xl font-bold text-primary sm:text-4xl">--</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-400 sm:text-xs">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.done) {
    return (
      <p className="font-display text-2xl font-bold uppercase tracking-wide text-primary">
        The draft is here. Good luck.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {UNITS.map(([key, label]) => (
        <div key={label} className="rounded-xl bg-ink-800 px-2 py-3 text-center sm:px-4 sm:py-5">
          <div className="font-display text-2xl font-bold tabular-nums text-primary sm:text-4xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-400 sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
