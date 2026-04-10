import { NextResponse } from "next/server";
import { templates } from "@/lib/data/mock";

export async function GET() {
  return NextResponse.json(templates);
}
