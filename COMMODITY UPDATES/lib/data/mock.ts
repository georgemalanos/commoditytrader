import { calculateEventRelevance, tagEventRelevance } from "@/lib/events/relevance";
import type { BriefingDocument, CommodityMove, EventItem, FreightMove, NewsItem, TemplateDefinition } from "@/lib/types/domain";

const now = "2026-04-10T16:30:00.000Z";

export const sourceCatalog = [
  {
    id: "fred",
    name: "FRED",
    type: "official",
    updatedAt: now,
    confidence: "high",
    url: "https://fred.stlouisfed.org",
    note: "Official macro data and rate-sensitive indicators."
  },
  {
    id: "eia",
    name: "U.S. EIA",
    type: "official",
    updatedAt: now,
    confidence: "high",
    url: "https://www.eia.gov",
    note: "Public energy balances and inventory context."
  },
  {
    id: "manual",
    name: "Manual Freight Desk Input",
    type: "manual",
    updatedAt: "2026-04-10T14:00:00.000Z",
    confidence: "medium",
    note: "Internal desk-maintained placeholder until live freight source is connected."
  },
  {
    id: "demo",
    name: "Demo Seed Dataset",
    type: "demo",
    updatedAt: now,
    confidence: "low",
    note: "MVP demo content only."
  }
] as const;

export const commodityMoves: CommodityMove[] = [
  {
    slug: "crude-oil",
    name: "Crude Oil",
    group: "Energy",
    unit: "USD/bbl",
    latestValue: 87.4,
    changePercent: 1.2,
    direction: "up",
    drivers: ["OPEC+ supply discipline", "Atlantic basin prompt tightness", "steady refinery demand"],
    summary: "Crude proxies firmed overnight as prompt balances stayed tight and macro risk sentiment stabilized.",
    whatToWatch: ["Inventory releases", "Red Sea disruptions", "USD strength into the U.S. session"],
    source: {
      name: "U.S. EIA",
      type: "official",
      updatedAt: now,
      confidence: "high",
      url: "https://www.eia.gov"
    }
  },
  {
    slug: "lng",
    name: "LNG",
    group: "Energy",
    unit: "USD/MMBtu",
    latestValue: 11.8,
    changePercent: -0.4,
    direction: "down",
    drivers: ["Milder weather signal", "comfortable near-term inventories", "Asia spot demand selective"],
    summary: "LNG tone softened slightly, but basin arbitrage remains sensitive to any freight or outage surprise.",
    whatToWatch: ["European weather revisions", "unplanned outages", "LNG carrier availability"],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: now,
      confidence: "low",
      note: "Use as demo until a public LNG source is connected."
    }
  },
  {
    slug: "copper",
    name: "Copper",
    group: "Metals",
    unit: "USD/mt",
    latestValue: 9360,
    changePercent: -0.7,
    direction: "down",
    drivers: ["China demand caution", "stronger dollar bias", "mixed inventory signals"],
    summary: "Copper underperformed cyclicals as traders questioned near-term demand conviction.",
    whatToWatch: ["China credit headlines", "warehouse trends", "Fed-sensitive FX moves"],
    source: {
      name: "FRED",
      type: "official",
      updatedAt: now,
      confidence: "medium",
      note: "Macro proxy only; pair with a dedicated commodity price source later."
    }
  },
  {
    slug: "wheat",
    name: "Wheat",
    group: "Agriculture",
    unit: "USc/bu",
    latestValue: 604,
    changePercent: 0.6,
    direction: "up",
    drivers: ["Weather risk premium", "Black Sea shipment sensitivity", "fund covering"],
    summary: "Wheat nudged higher as weather and corridor risk re-entered the conversation.",
    whatToWatch: ["Crop condition updates", "export pace", "Black Sea headlines"],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: now,
      confidence: "low"
    }
  }
];

export const freightMoves: FreightMove[] = [
  {
    slug: "vlcc",
    label: "VLCC TD3C Proxy",
    market: "tanker",
    vesselClass: "VLCC",
    routeGroup: "Middle East to China",
    latestValue: 62,
    dayChange: 3,
    weekChange: 6,
    interpretation: "Tanker tone improved as fresh cargo activity outpaced prompt tonnage in the key crude lane.",
    watchItems: ["Middle East stems", "ballaster count", "China refinery demand"],
    source: {
      name: "Manual Freight Desk Input",
      type: "manual",
      updatedAt: "2026-04-10T14:00:00.000Z",
      confidence: "medium",
      note: "Manually maintained proxy. Replace with licensed or public freight source when available."
    }
  },
  {
    slug: "suezmax",
    label: "Suezmax West Africa Proxy",
    market: "tanker",
    vesselClass: "Suezmax",
    routeGroup: "West Africa to Europe",
    latestValue: 84,
    dayChange: 4,
    weekChange: 8,
    interpretation: "West Africa crude liftings and stronger owner sentiment supported Suezmax rates.",
    watchItems: ["North Sea competition", "Atlantic ballast list", "Mediterranean weather"],
    source: {
      name: "Manual Freight Desk Input",
      type: "manual",
      updatedAt: "2026-04-10T14:00:00.000Z",
      confidence: "medium"
    }
  },
  {
    slug: "capesize",
    label: "Capesize Pacific Proxy",
    market: "dry_bulk",
    vesselClass: "Capesize",
    routeGroup: "Australia to China",
    latestValue: 22.4,
    dayChange: -0.8,
    weekChange: 1.1,
    interpretation: "Dry bulk remains mixed, with Pacific ore support not yet translating into broad conviction.",
    watchItems: ["Iron ore restocking", "weather delays", "coal tender activity"],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: now,
      confidence: "low",
      note: "Demo-only dry bulk proxy until a validated feed is connected."
    }
  },
  {
    slug: "panamax",
    label: "Panamax Grain Proxy",
    market: "dry_bulk",
    vesselClass: "Panamax",
    routeGroup: "U.S. Gulf to Far East",
    latestValue: 16.8,
    dayChange: 0.3,
    weekChange: 0.9,
    interpretation: "Panamax sentiment is stable, with grain program support offsetting broader macro caution.",
    watchItems: ["Grain line-up", "Canal disruptions", "FFA sentiment"],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: now,
      confidence: "low"
    }
  }
];

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "Producer discipline keeps oil sentiment supported into Europe",
    url: "https://example.com/demo/oil-support",
    publishedAt: "2026-04-10T05:00:00.000Z",
    summary: "Public/demo coverage indicates prompt oil balances are still supportive despite mixed industrial data.",
    tags: ["oil", "macro"],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: "2026-04-10T05:00:00.000Z",
      confidence: "low"
    }
  },
  {
    id: "news-2",
    title: "Copper traders weigh softer demand narrative against supply tightness",
    url: "https://example.com/demo/copper-demand",
    publishedAt: "2026-04-10T06:15:00.000Z",
    summary: "Metals coverage remains split between weak macro tone and still-constrained concentrate and cathode availability.",
    tags: ["copper", "china"],
    contradictions: ["Demand weakness narrative is stronger in macro coverage than in physical market commentary."],
    source: {
      name: "Demo Seed Dataset",
      type: "demo",
      updatedAt: "2026-04-10T06:15:00.000Z",
      confidence: "low"
    }
  }
];

const rawEvents: Omit<EventItem, "relevanceScore" | "relevanceTag">[] = [
  {
    id: "event-1",
    title: "OPEC Monthly Market Report",
    date: "2026-04-12T09:00:00.000Z",
    location: "Online",
    category: "energy_policy",
    whyItMatters: "High signal for oil balances, producer messaging, and short-term crude trader positioning.",
    addToCalendarUrl: "#",
    bookmark: true,
    source: {
      name: "OPEC",
      type: "official",
      updatedAt: now,
      confidence: "high",
      url: "https://www.opec.org"
    }
  },
  {
    id: "event-2",
    title: "FOMC Minutes",
    date: "2026-04-10T18:00:00.000Z",
    location: "Washington, DC",
    category: "central_bank",
    whyItMatters: "Rates and dollar implications matter directly for metals, energy sentiment, and freight risk appetite.",
    addToCalendarUrl: "#",
    bookmark: false,
    source: {
      name: "Federal Reserve",
      type: "official",
      updatedAt: now,
      confidence: "high",
      url: "https://www.federalreserve.gov"
    }
  },
  {
    id: "event-3",
    title: "Marine Money Week",
    date: "2026-04-15T08:30:00.000Z",
    endDate: "2026-04-17T17:00:00.000Z",
    location: "New York",
    category: "networking",
    whyItMatters: "Useful for shipping finance and tanker market networking with owners, brokers, and service providers.",
    addToCalendarUrl: "#",
    bookmark: true,
    source: {
      name: "Event Organizer",
      type: "public_news",
      updatedAt: now,
      confidence: "medium",
      url: "https://www.marinemoney.com"
    }
  }
];

export const events: EventItem[] = rawEvents.map((event) => {
  const relevanceScore = calculateEventRelevance(event);
  return {
    ...event,
    relevanceScore,
    relevanceTag: tagEventRelevance(relevanceScore)
  };
});

export const templates: TemplateDefinition[] = [
  {
    id: "template-1",
    name: "Core Energy + Tankers",
    detailLevel: "standard",
    commodities: ["crude-oil", "lng"],
    freight: ["vlcc", "suezmax", "mr"],
    regions: ["Atlantic Basin", "Middle East", "Asia"],
    sourceMode: "free-first",
    sectionOrder: ["top-moves", "freight", "macro", "events", "watchlist"]
  },
  {
    id: "template-2",
    name: "Cross-Commodity Macro",
    detailLevel: "deep",
    commodities: ["crude-oil", "copper", "wheat"],
    freight: ["capesize", "panamax"],
    regions: ["Global"],
    sourceMode: "official-only",
    sectionOrder: ["macro", "commodities", "freight", "events", "risks"]
  }
];

export const morningBriefing: BriefingDocument = {
  id: "briefing-morning-2026-04-10",
  title: "Morning Briefing | 10 Apr 2026",
  kind: "morning",
  generatedAt: "2026-04-10T05:45:00.000Z",
  riskLevel: "Elevated",
  executiveSummary: "Crude and Atlantic tanker sentiment improved overnight while metals stayed more cautious. The key decision point for the session is whether supportive oil structure broadens into freight conviction and whether macro releases disrupt the bid.",
  sections: [
    {
      title: "Top Commodity Movers",
      type: "commodities",
      body: "Crude led the overnight tone higher, LNG softened modestly, and copper remained cautious on demand uncertainty.",
      bullets: [
        "Crude proxy up 1.2%; supply discipline and prompt balances remain supportive.",
        "Copper down 0.7%; China-demand conviction still feels incomplete.",
        "Wheat firmer on weather and Black Sea sensitivity."
      ],
      tags: ["Bullish", "Watch"],
      sources: [commodityMoves[0].source, commodityMoves[2].source]
    },
    {
      title: "Freight Highlights",
      type: "freight",
      body: "Tanker indicators improved in the Atlantic while dry bulk still looks selective rather than broad-based.",
      bullets: [
        "VLCC and Suezmax proxies improved on fresh cargo interest.",
        "Capesize signal remains mixed; ore support is not yet enough for full confirmation.",
        "Manual freight values are clearly labeled and can be replaced later by licensed Baltic adapters."
      ],
      tags: ["Freight Up", "Demo Data"],
      sources: [freightMoves[0].source, freightMoves[2].source]
    },
    {
      title: "What Matters Today",
      type: "watch",
      body: "The session hinges on macro tone, inventory sensitivity, and whether freight strength persists into later cargo flow.",
      bullets: [
        "Watch the dollar reaction to central-bank-sensitive macro releases.",
        "Inventory releases matter more than usual because oil positioning is already leaning constructive.",
        "If tanker firmness fails to broaden, freight enthusiasm may stay local rather than systemic."
      ],
      tags: ["High Impact", "Event Risk"],
      sources: [events[1].source]
    }
  ]
};

export const closeBriefing: BriefingDocument = {
  id: "briefing-close-2026-04-10",
  title: "Market Close Briefing | 10 Apr 2026",
  kind: "close",
  generatedAt: "2026-04-10T17:40:00.000Z",
  riskLevel: "Moderate",
  executiveSummary: "Oil strength held into the close and Atlantic tanker tone stayed constructive, while metals finished mixed and dry bulk confirmation remained limited. Tomorrow's focus shifts to whether follow-through appears in freight breadth and whether macro volatility disrupts the oil-led narrative.",
  deltas: [
    "Oil strength persisted longer than the morning base case implied.",
    "Dry bulk did not meaningfully confirm the tanker move.",
    "Macro volatility rose, but not enough to reverse commodity leadership."
  ],
  sections: [
    {
      title: "Biggest Moves Of The Day",
      type: "moves",
      body: "Oil and tanker sentiment led, while metals and bulk were mixed rather than directionally clean.",
      bullets: [
        "Crude retained gains into the close, supported by tight prompt tone.",
        "Suezmax and VLCC proxies ended firmer on improved owner leverage.",
        "Copper remained sensitive to growth concerns and FX."
      ],
      tags: ["Bullish", "Freight Up"],
      sources: [commodityMoves[0].source, freightMoves[1].source]
    },
    {
      title: "Why Markets Moved",
      type: "narrative",
      body: "The day was defined by supply-discipline support in oil and a freight market willing to price tighter near-term availability, while macro uncertainty kept cyclicals from broadening cleanly.",
      bullets: [
        "Producer discipline mattered more than softer macro headlines.",
        "Atlantic tanker positioning improved as cargo flow absorbed prompt tonnage.",
        "Dry bulk stayed too fragmented to produce a strong risk-on read-through."
      ],
      tags: ["Watch"],
      sources: [newsItems[0].source, newsItems[1].source]
    },
    {
      title: "Tomorrow's Watchlist",
      type: "watchlist",
      body: "The next session depends on confirmation, not just direction. Watch whether oil leadership expands and whether macro volatility accelerates.",
      bullets: [
        "Look for second-day confirmation in tanker routes and route breadth.",
        "Track whether copper stabilizes or drags broader cyclicals again.",
        "Keep event risk high around policy and producer messaging."
      ],
      tags: ["Event Risk", "Watch"],
      sources: [events[0].source, events[1].source]
    }
  ]
};
