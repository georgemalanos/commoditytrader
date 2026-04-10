import { NextResponse } from "next/server";
import { commodityMoves, freightMoves } from "@/lib/data/mock";

export async function GET() {
  return NextResponse.json({
    commodities: commodityMoves,
    freight: freightMoves
  });
}
