import type { CommodityMove, EventItem, FreightMove, NewsItem } from "@/lib/types/domain";

export interface CommodityAdapter {
  slug: string;
  displayName: string;
  fetch(): Promise<CommodityMove[]>;
}

export interface FreightAdapter {
  slug: string;
  displayName: string;
  fetch(): Promise<FreightMove[]>;
}

export interface NewsAdapter {
  slug: string;
  displayName: string;
  fetch(): Promise<NewsItem[]>;
}

export interface EventAdapter {
  slug: string;
  displayName: string;
  fetch(): Promise<EventItem[]>;
}
