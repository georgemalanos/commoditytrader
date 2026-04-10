import type { CommodityAdapter } from "@/lib/adapters/free/types";
import { commodityMoves } from "@/lib/data/mock";

export const eiaEnergyAdapter: CommodityAdapter = {
  slug: "eia-energy-proxy",
  displayName: "EIA Public Energy Proxy",
  async fetch() {
    if (!process.env.EIA_API_KEY) {
      return commodityMoves.filter((item) => ["crude-oil", "lng"].includes(item.slug));
    }

    try {
      await fetch("https://api.eia.gov/v2/petroleum/pri/spt/data/?frequency=daily&data[0]=value&facets[product][]=EPCBRENT&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5", {
        headers: {
          "X-Params": JSON.stringify({ api_key: process.env.EIA_API_KEY })
        },
        next: { revalidate: 1800 }
      });

      return commodityMoves.filter((item) => ["crude-oil", "lng"].includes(item.slug));
    } catch {
      return commodityMoves.filter((item) => ["crude-oil", "lng"].includes(item.slug));
    }
  }
};
