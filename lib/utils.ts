import { clsx } from "clsx";

export function cn(...args: Array<string | boolean | undefined | null>) {
  return clsx(args);
}

export function formatPct(value?: number) {
  if (typeof value !== "number") return "n/a";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatValue(value?: number, unit?: string) {
  if (typeof value !== "number") return "n/a";
  return `${value.toLocaleString()}${unit ? ` ${unit}` : ""}`;
}
