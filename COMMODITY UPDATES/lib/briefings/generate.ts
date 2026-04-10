import { closeBriefing, commodityMoves, events, freightMoves, morningBriefing, newsItems, templates } from "@/lib/data/mock";
import type { BriefingDocument, BriefingKind, DetailLevel } from "@/lib/types/domain";

export interface GenerateBriefingInput {
  kind: BriefingKind;
  detailLevel?: DetailLevel;
  commodityFilter?: string[];
  freightFilter?: string[];
}

function filterUniverse(input: GenerateBriefingInput) {
  const commodityFilter = input.commodityFilter?.length ? input.commodityFilter : templates[0].commodities;
  const freightFilter = input.freightFilter?.length ? input.freightFilter : templates[0].freight;

  return {
    commodities: commodityMoves.filter((item) => commodityFilter.includes(item.slug)),
    freight: freightMoves.filter((item) => freightFilter.includes(item.slug)),
    news: newsItems,
    events: events.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5)
  };
}

export async function generateBriefing(input: GenerateBriefingInput): Promise<BriefingDocument> {
  const universe = filterUniverse(input);
  const base = input.kind === "morning" ? morningBriefing : closeBriefing;

  const detailLevel = input.detailLevel ?? "standard";
  const extraBullets =
    detailLevel === "deep"
      ? [
          `Coverage universe: ${universe.commodities.map((item) => item.name).join(", ")}.`,
          `Freight focus: ${universe.freight.map((item) => item.vesselClass).join(", ")}.`,
          `Top scheduled events: ${universe.events.map((item) => item.title).slice(0, 2).join("; ")}.`
        ]
      : [];

  return {
    ...base,
    sections: base.sections.map((section, index) => ({
      ...section,
      bullets: index === 0 ? [...section.bullets, ...extraBullets] : section.bullets
    }))
  };
}
