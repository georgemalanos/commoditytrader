import { NextResponse } from "next/server";
import { generateBriefing } from "@/lib/briefings/generate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const briefing = await generateBriefing({
    kind: body.kind === "close" ? "close" : "morning",
    detailLevel: body.detailLevel ?? "standard",
    commodityFilter: body.commodityFilter,
    freightFilter: body.freightFilter
  });

  return NextResponse.json(briefing);
}
