import Parser from "rss-parser";
import type { NewsAdapter } from "@/lib/adapters/free/types";
import { newsItems } from "@/lib/data/mock";

type Item = Parser.Item;

const parser = new Parser<Item>();

export const publicNewsAdapter: NewsAdapter = {
  slug: "public-rss-news",
  displayName: "Public RSS News",
  async fetch() {
    if (!process.env.ENABLE_LIVE_RSS) {
      return newsItems;
    }

    try {
      const feed = await parser.parseURL("https://www.reutersagency.com/feed/?best-sectors=commodities&post_type=best");
      return feed.items.slice(0, 8).map((item, index) => ({
        id: item.guid ?? `rss-${index}`,
        title: item.title ?? "Untitled",
        url: item.link ?? "#",
        publishedAt: item.isoDate ?? new Date().toISOString(),
        summary: item.contentSnippet ?? "Public feed item. Review the original article before relying on details.",
        tags: ["public-news", "rss"],
        source: {
          name: "Reuters Public Feed",
          type: "public_news",
          url: "https://www.reuters.com",
          updatedAt: item.isoDate ?? new Date().toISOString(),
          confidence: "medium",
          note: "Public page usage depends on accessibility and should be reviewed for licensing suitability."
        }
      }));
    } catch {
      return newsItems;
    }
  }
};
