import Link from "next/link";
import { BriefingCard } from "@/components/briefings/briefing-card";
import { AppShell } from "@/components/layout/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { closeBriefing, morningBriefing } from "@/lib/data/mock";

export default async function BriefingsPage() {
  await requireSession();

  return (
    <AppShell
      title="Briefings"
      subtitle="Morning and close reports are archived with export hooks, source transparency, and reusable templates."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <BriefingCard briefing={morningBriefing} />
        <BriefingCard briefing={closeBriefing} />
      </div>
      <Panel className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Archive</p>
            <h3 className="mt-2 text-xl font-semibold">Historical comparison</h3>
          </div>
          <Link href="/api/briefings/briefing-morning-2026-04-10/pdf" className="rounded-2xl border border-edge px-4 py-3 text-sm text-fog transition hover:bg-ink hover:text-paper">
            Export Morning PDF
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["2026-04-10", "2026-04-09", "2026-04-08"].map((date) => (
            <Link
              key={date}
              href={`/briefings/${date}`}
              className="rounded-2xl border border-edge/70 bg-ink/35 px-4 py-4 text-sm text-paper transition hover:border-cyan"
            >
              {date}
            </Link>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
