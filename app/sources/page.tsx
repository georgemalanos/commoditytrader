import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { sourceCatalog } from "@/lib/data/mock";
import { credibilityBadge, scoreFreshness } from "@/lib/scoring/source-quality";

export default async function SourcesPage() {
  await requireSession();

  return (
    <AppShell
      title="Sources"
      subtitle="Source connectors are explicit, ranked, and replaceable. Free/public sources run the MVP, while premium providers remain optional adapters until licensed."
    >
      <div className="grid gap-4">
        {sourceCatalog.map((source) => {
          const sourceUrl = "url" in source ? source.url : undefined;
          const badge = credibilityBadge(source);
          const freshness = scoreFreshness(source.updatedAt);

          return (
            <Panel key={source.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{source.type}</p>
                  <h3 className="mt-2 text-xl font-semibold">{source.name}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-fog">{source.note}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge label={source.type === "official" ? "Official Source" : source.type === "public_news" ? "Public Source" : source.type === "demo" ? "Demo Data" : "Watch"} />
                  <span className="rounded-full border border-edge px-3 py-1 text-xs text-fog">{badge.label}</span>
                  <span className="rounded-full border border-edge px-3 py-1 text-xs text-fog">{freshness.label}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-fog">
                <span>Updated {new Date(source.updatedAt).toLocaleString()}</span>
                <Link href={sourceUrl ?? "#"} className="text-cyan transition hover:text-paper">
                  {sourceUrl ? "Open source" : "No external link"}
                </Link>
              </div>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
