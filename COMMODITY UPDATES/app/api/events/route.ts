import { NextResponse } from "next/server";
import { publicEventsAdapter } from "@/lib/adapters/free/public-events-adapter";

export async function GET() {
  return NextResponse.json(await publicEventsAdapter.fetch());
}
