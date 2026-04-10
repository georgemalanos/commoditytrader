import { BriefingCard } from "@/components/briefings/briefing-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { EventCard } from "@/components/events/event-card";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { commodityMoves, events, freightMoves, sourceCatalog, closeBriefing, morningBriefing } from "@/lib/data/mock";
import { credibilityBadge, scoreFreshness } from "@/lib/scoring/source-quality";
import { formatPct, formatValue } from "@/lib/utils";

export default async function DashboardPage() {
  await requireSession();

  return (
    <AppShell
      title="Dashboard"
      subtitle="Two daily briefings, freight and commodity watchlists, and event intelligence organized for fast trading decisions."
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard title="Morning Briefing" value="07:00" note="Scheduled generation time" />
        <StatCard title="Close Briefing" value="18:00" note="Scheduled generation time" />
        <StatCard title="Watched Commodities" value="12" note="Configurable universe" />
        <StatCard title="Watched Freight Lines" value="9" note="Tanker and dry bulk focus" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <BriefingCard briefing={morningBriefing} />
        <BriefingCard briefing={closeBriefing} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Commodity Highlights</p>
              <h3 className="mt-2 text-xl font-semibold">What moved and why</h3>
            </div>
            <Badge label="Official Source" />
          </div>
          <div className="mt-5 space-y-3">
            {commodityMoves.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-edge/70 bg-ink/35 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-fog">{item.summary}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-paper">{formatValue(item.latestValue, item.unit)}</p>
                    <p className={item.direction === "up" ? "text-sm text-signal" : item.direction === "down" ? "text-sm text-danger" : "text-sm text-fog"}>
                      {formatPct(item.changePercent)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.drivers.map((driver) => (
                    <span key={driver} className="rounded-full border border-edge px-3 py-1 text-xs text-fog">
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Freight Highlights</p>
              <h3 className="mt-2 text-xl font-semibold">Tanker and dry bulk watch</h3>
            </div>
            <Badge label="Demo Data" />
          </div>
          <div className="mt-5 space-y-3">
            {freightMoves.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-edge/70 bg-ink/35 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-fog">{item.interpretation}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-paper">{item.latestValue ?? "n/a"}</p>
                    <p className={item.dayChange && item.dayChange >= 0 ? "text-sm text-signal" : "text-sm text-danger"}>
                      DoD {formatPct(item.dayChange)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.watchItems.map((watch) => (
                    <span key={watch} className="rounded-full border border-edge px-3 py-1 text-xs text-fog">
                      {watch}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Key Events Ahead</p>
          <h3 className="mt-2 text-xl font-semibold">Macro and networking calendar</h3>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Panel>

        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Source Transparency</p>
          <h3 className="mt-2 text-xl font-semibold">Trust and freshness by connector</h3>
          <div className="mt-5 space-y-3">
            {sourceCatalog.map((source) => {
              const sourceLabel = {
                name: source.name,
                type: source.type,
                updatedAt: source.updatedAt,
                confidence: source.confidence,
                url: source.url,
                note: source.note
              } as const;
              const credibility = credibilityBadge(sourceLabel);
              const freshness = scoreFreshness(source.updatedAt);

              return (
                <div key={source.id} className="rounded-2xl border border-edge/70 bg-ink/35 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{source.name}</p>
                      <p className="mt-1 text-sm text-fog">{source.note}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-paper">{credibility.label}</p>
                      <p className="text-fog">{freshness.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
