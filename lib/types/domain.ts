export type SourceType =
  | "official"
  | "public_news"
  | "public_data"
  | "premium"
  | "manual"
  | "estimated"
  | "demo";

export type Confidence = "high" | "medium" | "low";
export type Direction = "up" | "down" | "flat";
export type BriefingKind = "morning" | "close";
export type DetailLevel = "brief" | "standard" | "deep";

export interface SourceLabel {
  name: string;
  type: SourceType;
  url?: string;
  updatedAt: string;
  confidence: Confidence;
  note?: string;
}

export interface CommodityMove {
  slug: string;
  name: string;
  group: string;
  unit: string;
  latestValue?: number;
  changePercent?: number;
  direction: Direction;
  drivers: string[];
  summary: string;
  whatToWatch: string[];
  source: SourceLabel;
}

export interface FreightMove {
  slug: string;
  label: string;
  market: "tanker" | "dry_bulk" | "lng" | "lpg" | "container";
  vesselClass: string;
  routeGroup: string;
  latestValue?: number;
  dayChange?: number;
  weekChange?: number;
  interpretation: string;
  watchItems: string[];
  source: SourceLabel;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  contradictions?: string[];
  source: SourceLabel;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  relevanceScore: number;
  relevanceTag: string;
  whyItMatters: string;
  addToCalendarUrl?: string;
  bookmark: boolean;
  source: SourceLabel;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  detailLevel: DetailLevel;
  commodities: string[];
  freight: string[];
  regions: string[];
  sourceMode: "free-first" | "premium-first" | "official-only";
  sectionOrder: string[];
}

export interface BriefingSection {
  title: string;
  type: string;
  body: string;
  bullets: string[];
  tags: string[];
  sources: SourceLabel[];
}

export interface BriefingDocument {
  id: string;
  title: string;
  kind: BriefingKind;
  generatedAt: string;
  riskLevel: "Low" | "Moderate" | "Elevated" | "High";
  executiveSummary: string;
  sections: BriefingSection[];
  deltas?: string[];
}
