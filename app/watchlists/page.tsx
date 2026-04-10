import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { commodityMoves, freightMoves } from "@/lib/data/mock";

export default async function WatchlistsPage() {
  await requireSession();

  return (
    <AppShell
      title="Watchlists"
      subtitle="Custom commodity and freight universes drive report generation, alerting, and saved templates."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Commodities</p>
          <h3 className="mt-2 text-xl font-semibold">Watched markets</h3>
          <div className="mt-5 space-y-3">
            {commodityMoves.map((item) => (
              <div key={item.slug} className="flex items-center justify-between rounded-2xl border border-edge/70 bg-ink/35 px-4 py-4">
                <div>
                  <p className="font-medium text-paper">{item.name}</p>
                  <p className="text-sm text-fog">{item.group}</p>
                </div>
                <Badge label={item.direction === "up" ? "Bullish" : item.direction === "down" ? "Bearish" : "Watch"} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Freight</p>
          <h3 className="mt-2 text-xl font-semibold">Vessel classes and route proxies</h3>
          <div className="mt-5 space-y-3">
            {freightMoves.map((item) => (
              <div key={item.slug} className="flex items-center justify-between rounded-2xl border border-edge/70 bg-ink/35 px-4 py-4">
                <div>
                  <p className="font-medium text-paper">{item.vesselClass}</p>
                  <p className="text-sm text-fog">{item.routeGroup}</p>
                </div>
                <Badge label={item.market === "tanker" ? "Freight Up" : "Watch"} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
