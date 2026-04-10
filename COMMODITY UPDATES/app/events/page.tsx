import { EventCard } from "@/components/events/event-card";
import { AppShell } from "@/components/layout/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { events } from "@/lib/data/mock";

export default async function EventsPage() {
  await requireSession();

  return (
    <AppShell
      title="Important Events"
      subtitle="High-relevance macro releases, energy meetings, shipping conferences, and networking opportunities scored for trading relevance."
    >
      <Panel className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Scoring Model</p>
        <h3 className="mt-2 text-xl font-semibold">Sample event relevance logic</h3>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-fog">
          Events are ranked by category weight, commodity/freight keyword overlap, and direct market-action relevance. OPEC, central-bank, inventory, and freight-specific events receive the strongest boosts; general networking events are included when they offer meaningful business-development access.
        </p>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </AppShell>
  );
}
