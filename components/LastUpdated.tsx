"use client";

import { useEffect, useState } from "react";

export function LastUpdated() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/sleeper/state")
      .then((res) => res.json())
      .then((json: { fetchedAt?: number }) => {
        if (cancelled || !json.fetchedAt) return;
        const time = new Date(json.fetchedAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
        setLabel(time);
      })
      .catch(() => {
        if (!cancelled) setLabel(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!label) return null;

  return (
    <p className="text-xs text-ink-500">
      Data cached from Sleeper &middot; last refreshed {label}
    </p>
  );
}
