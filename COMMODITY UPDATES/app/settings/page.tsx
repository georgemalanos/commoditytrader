import { AppShell } from "@/components/layout/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";

export default async function SettingsPage() {
  await requireSession();

  return (
    <AppShell
      title="Settings"
      subtitle="Personal controls for reporting times, source strategy, alerts, and future premium connector enablement."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Reporting</p>
          <h3 className="mt-2 text-xl font-semibold">Daily schedule</h3>
          <div className="mt-5 space-y-3 text-sm text-fog">
            <p>Morning briefing: 07:00 local time</p>
            <p>Close briefing: 18:00 local time</p>
            <p>Delivery: in-app by default, email-ready architecture included</p>
          </div>
        </Panel>
        <Panel>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Connectors</p>
          <h3 className="mt-2 text-xl font-semibold">Source strategy</h3>
          <div className="mt-5 space-y-3 text-sm text-fog">
            <p>Default mode: free-first</p>
            <p>Fallback labels: manual, estimated, and demo are always explicit</p>
            <p>Premium connectors: disabled until licensed keys or feeds are provided</p>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
