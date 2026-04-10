import Link from "next/link";
import { BriefingSection } from "@/components/briefings/briefing-section";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { closeBriefing, morningBriefing } from "@/lib/data/mock";

export default async function BriefingDetailPage({
  params
}: {
  params: Promise<{ date: string }>;
}) {
  await requireSession();
  const { date } = await params;
  const briefing = date === "2026-04-10" ? morningBriefing : closeBriefing;

  return (
    <AppShell
      title={briefing.title}
      subtitle="Briefings are structured for quick scanning, explicit source grounding, and later export to PDF or email."
    >
      <Panel className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Executive Summary</p>
            <h3 className="mt-2 text-2xl font-semibold">{briefing.executiveSummary}</h3>
          </div>
          <Badge label={briefing.riskLevel === "Elevated" ? "Event Risk" : "Watch"} />
        </div>
        {briefing.deltas?.length ? (
          <div className="mt-5">
            <p className="text-sm font-medium text-paper">Changes vs prior view</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {briefing.deltas.map((delta) => (
                <span key={delta} className="rounded-full border border-edge px-3 py-1 text-xs text-fog">
                  {delta}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-5 flex gap-3">
          <Link href={`/api/briefings/${briefing.id}/pdf`} className="rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink">
            Export PDF
          </Link>
          <Link href="/briefings" className="rounded-2xl border border-edge px-4 py-3 text-sm text-fog">
            Back to archive
          </Link>
        </div>
      </Panel>
      <div className="grid gap-4">
        {briefing.sections.map((section) => (
          <BriefingSection key={section.title} section={section} />
        ))}
      </div>
    </AppShell>
  );
}
