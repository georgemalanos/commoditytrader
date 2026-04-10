import { differenceInHours, parseISO } from "date-fns";
import type { Confidence, SourceLabel } from "@/lib/types/domain";

export function scoreFreshness(updatedAt: string) {
  const ageHours = Math.max(0, differenceInHours(new Date(), parseISO(updatedAt)));

  if (ageHours <= 3) return { label: "Fresh", score: 95 };
  if (ageHours <= 12) return { label: "Current", score: 80 };
  if (ageHours <= 24) return { label: "Aging", score: 58 };
  return { label: "Stale", score: 35 };
}

export function credibilityBadge(source: SourceLabel) {
  const base =
    source.type === "official"
      ? 96
      : source.type === "public_data"
        ? 88
        : source.type === "public_news"
          ? 76
          : source.type === "manual"
            ? 60
            : source.type === "estimated"
              ? 46
              : source.type === "demo"
                ? 22
                : 70;

  const freshness = scoreFreshness(source.updatedAt).score;
  const confidencePenalty: Record<Confidence, number> = {
    high: 0,
    medium: -8,
    low: -16
  };

  const score = Math.max(0, Math.min(100, base + Math.round((freshness - 50) / 3) + confidencePenalty[source.confidence]));

  return {
    score,
    label:
      score >= 85 ? "Institutional-grade" :
      score >= 70 ? "Trusted public" :
      score >= 50 ? "Use with care" :
      "Low confidence"
  };
}
