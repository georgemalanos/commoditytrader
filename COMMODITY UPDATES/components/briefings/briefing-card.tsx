import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import type { BriefingDocument } from "@/lib/types/domain";

export function BriefingCard({ briefing }: { briefing: BriefingDocument }) {
  return (
    <Panel className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{briefing.kind}</p>
            <h3 className="mt-2 text-xl font-semibold">{briefing.title}</h3>
          </div>
          <Badge label={briefing.riskLevel === "High" || briefing.riskLevel === "Elevated" ? "Event Risk" : "Watch"} />
        </div>
        <p className="mt-4 text-sm leading-6 text-fog">{briefing.executiveSummary}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-fog">Generated {new Date(briefing.generatedAt).toLocaleString()}</p>
        <Link href={`/briefings/${briefing.generatedAt.slice(0, 10)}`} className="text-sm text-cyan transition hover:text-paper">
          Open briefing
        </Link>
      </div>
    </Panel>
  );
}
