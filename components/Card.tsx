import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-700 bg-ink-800/60 p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-ink-100 sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-2 max-w-2xl text-ink-300">{subtitle}</p>}
    </div>
  );
}
