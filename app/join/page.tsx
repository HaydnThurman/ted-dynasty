import { FORM_URL, LEAGUE_NAME, SLEEPER_INVITE_URL } from "@/config";
import { SectionHeading } from "@/components/Card";

export const metadata = { title: "Join | TED DYNASTY" };

export default function JoinPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Onboarding"
        title="Join the League"
        subtitle={`Fill out the form below to lock in your spot in ${LEAGUE_NAME}, then join the Sleeper league itself.`}
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 transition-transform hover:scale-105"
        >
          Open Form in New Tab
        </a>
        <a
          href={SLEEPER_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink-600 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink-100 transition-colors hover:border-accent hover:text-accent"
        >
          Join on Sleeper
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-100">
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title={`${LEAGUE_NAME} onboarding form`}
          className="h-[1100px] w-full"
          loading="lazy"
        >
          Loading form…
        </iframe>
      </div>
    </div>
  );
}
