import type { CommodityAdapter } from "@/lib/adapters/free/types";
import { commodityMoves } from "@/lib/data/mock";

export const fredMacroAdapter: CommodityAdapter = {
  slug: "fred-macro-proxy",
  displayName: "FRED Macro Proxy",
  async fetch() {
    if (!process.env.FRED_API_KEY) {
      return commodityMoves.filter((item) => item.slug === "copper");
    }

    try {
      const series = ["DTWEXBGS", "DGS10"];
      await Promise.all(
        series.map((id) =>
          fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${process.env.FRED_API_KEY}&file_type=json`, {
            next: { revalidate: 900 }
          })
        )
      );

      return commodityMoves.filter((item) => item.slug === "copper");
    } catch {
      return commodityMoves.filter((item) => item.slug === "copper");
    }
  }
};
