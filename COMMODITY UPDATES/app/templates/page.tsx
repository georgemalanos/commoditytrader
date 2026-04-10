import { AppShell } from "@/components/layout/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireSession } from "@/lib/auth/session";
import { templates } from "@/lib/data/mock";

export default async function TemplatesPage() {
  await requireSession();

  return (
    <AppShell
      title="Templates"
      subtitle="Saved report templates let you switch quickly between energy-heavy, freight-heavy, and macro-led views."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {templates.map((template) => (
          <Panel key={template.id}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{template.detailLevel}</p>
            <h3 className="mt-2 text-xl font-semibold">{template.name}</h3>
            <div className="mt-5 space-y-2 text-sm text-fog">
              <p>Commodities: {template.commodities.join(", ")}</p>
              <p>Freight: {template.freight.join(", ")}</p>
              <p>Regions: {template.regions.join(", ")}</p>
              <p>Source mode: {template.sourceMode}</p>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
