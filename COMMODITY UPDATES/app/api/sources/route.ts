import { NextResponse } from "next/server";
import { sourceCatalog } from "@/lib/data/mock";

export async function GET() {
  return NextResponse.json(sourceCatalog);
}
