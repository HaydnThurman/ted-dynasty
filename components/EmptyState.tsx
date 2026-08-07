export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-600 bg-ink-800/40 p-8 text-center">
      <p className="font-display text-lg font-bold uppercase tracking-wide text-ink-100">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">{body}</p>
    </div>
  );
}
