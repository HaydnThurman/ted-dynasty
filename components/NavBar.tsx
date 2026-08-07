"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LEAGUE_NAME } from "@/config";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/standings", label: "Standings" },
  { href: "/bonus-tracker", label: "Bonus Tracker" },
  { href: "/recaps", label: "Recaps" },
  { href: "/members", label: "Members" },
  { href: "/rules", label: "Rules" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/ted-49ers-transparent.png"
            alt={`${LEAGUE_NAME} logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover object-[50%_10%]"
            priority
          />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
            {LEAGUE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-primary" : "text-ink-300 hover:text-ink-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/join"
            className="rounded-full bg-primary px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-ink-900 transition-transform hover:scale-105"
          >
            Join
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 text-ink-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-700 bg-ink-900 px-4 py-3 md:hidden">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 font-display text-sm font-semibold uppercase tracking-wide ${
                  active ? "bg-ink-800 text-primary" : "text-ink-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md bg-primary px-3 py-2 text-center font-display text-sm font-bold uppercase tracking-wide text-ink-900"
          >
            Join
          </Link>
        </nav>
      )}
    </header>
  );
}
