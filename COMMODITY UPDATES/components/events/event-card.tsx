import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import type { EventItem } from "@/lib/types/domain";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Panel className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{event.category.replace("_", " ")}</p>
          <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
        </div>
        <Badge label={event.relevanceTag} />
      </div>
      <div className="mt-4 space-y-2 text-sm text-fog">
        <p>{new Date(event.date).toLocaleString()}</p>
        <p>{event.location}</p>
        <p>{event.whyItMatters}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <div className="text-fog">
          {event.source.name} | {event.source.type}
        </div>
        <Link href={event.source.url ?? "#"} className="text-cyan transition hover:text-paper">
          Source
        </Link>
      </div>
    </Panel>
  );
}
