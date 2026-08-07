import { SectionHeading } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { getAllRecaps } from "@/lib/recaps";

export const metadata = { title: "Weekly Recap | TED DYNASTY" };

export default function RecapsPage() {
  const recaps = getAllRecaps();

  return (
    <div>
      <SectionHeading
        eyebrow="Straight from the commissioner"
        title="Weekly Recap"
        subtitle="Power rankings, trash talk, and whatever else happened. Newest first."
      />

      {recaps.length === 0 ? (
        <EmptyState
          title="Nothing to recap yet"
          body="Ted's saving his hot takes for week 1. Check back once the season kicks off."
        />
      ) : (
        <div className="space-y-4">
          {recaps.map((recap) => (
            <article
              key={recap.week}
              className="rounded-2xl border border-ink-700 bg-ink-800/40 p-6"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-primary">
                Week {recap.week}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink-100">
                {recap.title}
              </h2>
              <p className="mt-3 whitespace-pre-line text-ink-300">
                {recap.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
