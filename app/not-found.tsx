import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] opacity-20" />
      <section className="relative max-w-xl rounded-[32px] border border-edge bg-panel/95 p-8 shadow-terminal">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-fog">
          This route is not available in the commodity intelligence terminal. Return to the dashboard or check the URL.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cyan"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
