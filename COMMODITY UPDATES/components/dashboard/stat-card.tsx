import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { formatPct } from "@/lib/utils";

export function StatCard({
  title,
  value,
  change,
  note
}: {
  title: string;
  value: string;
  change?: number;
  note: string;
}) {
  const Icon = typeof change !== "number" ? Minus : change >= 0 ? ArrowUpRight : ArrowDownRight;
  const color = typeof change !== "number" ? "text-fog" : change >= 0 ? "text-signal" : "text-danger";

  return (
    <Panel className="space-y-3">
      <p className="text-sm text-fog">{title}</p>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-paper">{value}</p>
          <p className="mt-2 text-sm text-fog">{note}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${color}`}>
          <Icon className="h-4 w-4" />
          {formatPct(change)}
        </div>
      </div>
    </Panel>
  );
}
