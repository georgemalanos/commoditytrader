"use client";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] opacity-20" />
      <section className="relative max-w-xl rounded-[32px] border border-edge bg-panel/95 p-8 shadow-terminal">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-danger">Runtime Error</p>
        <h1 className="mt-4 text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-fog">
          The terminal hit an unexpected error. Try again, and use the digest below if this needs deeper debugging.
        </p>
        <div className="mt-4 rounded-2xl border border-edge bg-ink/60 p-4 font-mono text-xs text-fog">
          {error.digest ?? error.message}
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cyan"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
