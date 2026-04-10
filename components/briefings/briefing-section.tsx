import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import type { BriefingSection as BriefingSectionType } from "@/lib/types/domain";

export function BriefingSection({ section }: { section: BriefingSectionType }) {
  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{section.type}</p>
          <h3 className="mt-2 text-xl font-semibold">{section.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {section.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-fog">{section.body}</p>
      <ul className="mt-4 space-y-2 text-sm text-paper">
        {section.bullets.map((bullet) => (
          <li key={bullet} className="rounded-2xl border border-edge/70 bg-ink/35 px-4 py-3">
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-fog">
        {section.sources.map((source) => (
          <span key={`${section.title}-${source.name}`} className="rounded-full border border-edge px-3 py-1">
            {source.name} | {source.type} | {new Date(source.updatedAt).toLocaleString()}
          </span>
        ))}
      </div>
    </Panel>
  );
}
