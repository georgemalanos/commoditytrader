import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { BriefingPdf } from "@/lib/pdf/briefing-pdf";
import { closeBriefing, morningBriefing } from "@/lib/data/mock";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const briefing = id.includes("close") ? closeBriefing : morningBriefing;
  const pdf = await renderToBuffer(<BriefingPdf briefing={briefing} />);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${briefing.id}.pdf"`
    }
  });
}
