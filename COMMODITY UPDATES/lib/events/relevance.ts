import type { EventItem } from "@/lib/types/domain";

const CATEGORY_WEIGHTS: Record<string, number> = {
  macro: 34,
  central_bank: 30,
  energy_policy: 30,
  inventory: 26,
  freight: 24,
  conference: 18,
  networking: 14
};

export function calculateEventRelevance(event: Pick<EventItem, "category" | "whyItMatters" | "location">) {
  const base = CATEGORY_WEIGHTS[event.category] ?? 10;
  const text = `${event.whyItMatters} ${event.location}`.toLowerCase();

  const keywords = [
    ["opec", 20],
    ["fomc", 18],
    ["ecb", 16],
    ["inventory", 14],
    ["freight", 12],
    ["tankers", 12],
    ["iron ore", 12],
    ["lng", 12],
    ["trading", 10],
    ["networking", 8]
  ] as const;

  const boost = keywords.reduce((sum, [keyword, value]) => sum + (text.includes(keyword) ? value : 0), 0);
  return Math.min(100, base + boost);
}

export function tagEventRelevance(score: number) {
  if (score >= 75) return "High Impact";
  if (score >= 55) return "Watch";
  return "Optional";
}
