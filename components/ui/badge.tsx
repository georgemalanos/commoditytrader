import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Bullish: "border-signal/40 bg-signal/10 text-signal",
  Bearish: "border-danger/40 bg-danger/10 text-danger",
  Watch: "border-warning/40 bg-warning/10 text-warning",
  "High Impact": "border-cyan/40 bg-cyan/10 text-cyan",
  "Freight Up": "border-signal/40 bg-signal/10 text-signal",
  "Freight Down": "border-danger/40 bg-danger/10 text-danger",
  "Event Risk": "border-warning/40 bg-warning/10 text-warning",
  "Official Source": "border-cyan/40 bg-cyan/10 text-cyan",
  "Public Source": "border-fog/30 bg-fog/10 text-fog",
  "Premium Source": "border-paper/40 bg-paper/10 text-paper",
  "Demo Data": "border-danger/20 bg-danger/5 text-danger"
};

export function Badge({ label }: { label: string }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", styles[label] ?? "border-edge bg-edge/50 text-fog")}>
      {label}
    </span>
  );
}
