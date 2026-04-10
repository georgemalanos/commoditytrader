import type { CommodityAdapter } from "@/lib/adapters/free/types";
import { commodityMoves } from "@/lib/data/mock";

export const mockCommodityAdapter: CommodityAdapter = {
  slug: "demo-commodity-seed",
  displayName: "Demo Commodity Seed",
  async fetch() {
    return commodityMoves;
  }
};
