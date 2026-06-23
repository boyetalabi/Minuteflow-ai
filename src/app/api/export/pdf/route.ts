import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');

  if (!meetingId) {
    return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
  }

  // Fetch the meeting minutes
  const minutes = await prisma.minutes.findUnique({
    where: { meetingId }
  });

  if (!minutes) {
    return NextResponse.json({ error: "Minutes not found" }, { status: 404 });
  }

  // In a real application, you would use a library like 'pdfkit' to generate the PDF.
  // For this architecture mockup, we return a simple text representation and set headers.

  const pdfContent = `MEETING MINUTES\n\nSummary:\n${minutes.summary}\n\nAgenda:\n${minutes.agenda}\n\nDecisions:\n${minutes.decisions}`;

  return new NextResponse(pdfContent, {
    headers: {
      'Content-Disposition': `attachment; filename="meeting_${meetingId}.pdf"`,
      'Content-Type': 'application/pdf',
    },
  });
}
