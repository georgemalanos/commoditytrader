import type { CommodityMove, EventItem, FreightMove, NewsItem } from "@/lib/types/domain";

export interface PremiumConnectorConfig {
  provider: "bloomberg" | "reuters" | "spglobal" | "baltic" | "custom";
  enabled: boolean;
  credentialStatus: "missing" | "configured" | "error";
  notes?: string;
}

export interface PremiumCommodityConnector {
  provider: string;
  fetchCommodityMoves(symbols: string[]): Promise<CommodityMove[]>;
}

export interface PremiumFreightConnector {
  provider: string;
  fetchFreightMoves(routes: string[]): Promise<FreightMove[]>;
}

export interface PremiumNewsConnector {
  provider: string;
  fetchNews(query: string[]): Promise<NewsItem[]>;
}

export interface PremiumEventsConnector {
  provider: string;
  fetchEvents(filters: string[]): Promise<EventItem[]>;
}

export interface BalticLicensedConnector extends PremiumFreightConnector {
  mapBalticRoutes(): Promise<Record<string, string>>;
}
