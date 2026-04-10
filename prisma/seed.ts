import { PrismaClient, CommodityGroup, FreightMarket, SourceType, ConfidenceLevel, BriefingType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "trader@example.com" },
    update: {},
    create: {
      email: "trader@example.com",
      name: "Primary Trader"
    }
  });

  await prisma.userPreferences.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      regions: ["Global", "Atlantic Basin", "Middle East"],
      enabledCommodities: ["crude-oil", "lng", "copper", "wheat", "iron-ore"],
      enabledFreight: ["vlcc", "suezmax", "capesize", "panamax"]
    }
  });

  const sourceRows = [
    ["fred", "FRED", SourceType.OFFICIAL, "https://fred.stlouisfed.org", 94, 1],
    ["eia", "U.S. EIA", SourceType.OFFICIAL, "https://www.eia.gov", 92, 1],
    ["reuters-public", "Reuters Public", SourceType.PUBLIC_NEWS, "https://www.reuters.com", 84, 2],
    ["marine-public", "Public Maritime Feeds", SourceType.PUBLIC_NEWS, null, 76, 1],
    ["manual-freight", "Manual Freight Desk Input", SourceType.MANUAL, null, 70, 1],
    ["demo-seed", "Demo Seed Dataset", SourceType.DEMO, null, 45, 0]
  ] as const;

  const sources = await Promise.all(
    sourceRows.map(([slug, name, type, baseUrl, trustScore, costRank]) =>
      prisma.source.upsert({
        where: { slug },
        update: {},
        create: { slug, name, type, baseUrl, trustScore, costRank }
      })
    )
  );

  const commodities = [
    ["crude-oil", "Crude Oil", CommodityGroup.ENERGY, "USD/bbl"],
    ["lng", "LNG", CommodityGroup.ENERGY, "USD/MMBtu"],
    ["copper", "Copper", CommodityGroup.METALS, "USD/mt"],
    ["iron-ore", "Iron Ore", CommodityGroup.BULKS, "USD/dmt"],
    ["wheat", "Wheat", CommodityGroup.AGRICULTURE, "USc/bu"]
  ] as const;

  for (const [slug, name, group, unit] of commodities) {
    await prisma.commodity.upsert({
      where: { slug },
      update: {},
      create: { slug, name, group, unit }
    });
  }

  const vessels = [
    ["vlcc", "VLCC", FreightMarket.TANKER, "Dirty Crude"],
    ["suezmax", "Suezmax", FreightMarket.TANKER, "Dirty Crude"],
    ["aframax", "Aframax", FreightMarket.TANKER, "Regional Crude"],
    ["lr2", "LR2", FreightMarket.TANKER, "Clean Products"],
    ["mr", "MR", FreightMarket.TANKER, "Clean Products"],
    ["capesize", "Capesize", FreightMarket.DRY_BULK, "Iron Ore / Coal"],
    ["panamax", "Panamax", FreightMarket.DRY_BULK, "Grains / Coal"],
    ["supramax", "Supramax", FreightMarket.DRY_BULK, "Minor Bulks"]
  ] as const;

  for (const [slug, name, market, routeGroup] of vessels) {
    await prisma.vesselClass.upsert({
      where: { slug },
      update: {},
      create: { slug, name, market, routeGroup }
    });
  }

  const demoSource = sources.find((source) => source.slug === "demo-seed");
  if (!demoSource) throw new Error("Missing demo source");

  const crude = await prisma.commodity.findUniqueOrThrow({ where: { slug: "crude-oil" } });

  await prisma.article.upsert({
    where: { slug: "opec-supply-discipline-supports-crude-2026-04-10" },
    update: {},
    create: {
      title: "OPEC+ supply discipline supports crude into the European open",
      slug: "opec-supply-discipline-supports-crude-2026-04-10",
      url: "https://example.com/demo/opec-supply-discipline",
      publishedAt: new Date("2026-04-10T04:30:00Z"),
      summary: "Prompt-month crude stays supported as traders balance disciplined producer supply against softer industrial data.",
      excerpt: "Demo article used as a placeholder until live public feeds are enabled.",
      commodityId: crude.id,
      sourceId: demoSource.id,
      tags: ["oil", "macro", "opec"],
      sourceQuality: ConfidenceLevel.LOW,
      sourceType: SourceType.DEMO
    }
  });

  const briefing = await prisma.briefing.create({
    data: {
      userId: user.id,
      type: BriefingType.MORNING,
      title: "Morning Briefing | 10 Apr 2026",
      briefingDate: new Date("2026-04-10T05:45:00Z"),
      summary: "Crude and Atlantic tanker sentiment firmed overnight while base metals stayed mixed on China demand uncertainty.",
      riskLevel: "Elevated",
      metadata: { demo: true, mode: "seed" }
    }
  });

  await prisma.briefingSection.createMany({
    data: [
      {
        briefingId: briefing.id,
        title: "Top Moves",
        order: 1,
        sectionType: "moves",
        body: "Crude tone improved, tanker sentiment firmed, and copper lagged on softer industrial expectations.",
        bullets: [
          "Brent proxy up 1.2% overnight on tighter prompt balances.",
          "VLCC and Suezmax route sentiment improved in the Atlantic basin.",
          "Copper stayed cautious as traders weighed inventory and growth signals."
        ],
        sources: ["Demo Seed Dataset", "U.S. EIA"],
        tags: ["Bullish", "Freight Up", "Watch"]
      },
      {
        briefingId: briefing.id,
        title: "What To Watch",
        order: 2,
        sectionType: "watch",
        body: "Watch for inventory releases, central bank tone, and whether freight strength broadens beyond crude carriers.",
        bullets: [
          "Inventory print risk later in the day.",
          "Dollar sensitivity remains high for metals.",
          "Dry bulk confirmation is still missing."
        ],
        sources: ["FRED", "Demo Seed Dataset"],
        tags: ["Event Risk", "High Impact"]
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
