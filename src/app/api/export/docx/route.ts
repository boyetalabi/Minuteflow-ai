import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');

  if (!meetingId) {
    return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
  }

  // Fetch the meeting minutes from the database
  const minutes = await prisma.minutes.findUnique({
    where: { meetingId }
  });

  if (!minutes) {
    return NextResponse.json({ error: "Minutes not found" }, { status: 404 });
  }

  // In a real application, you would use a library like 'docx' to generate the file.
  // For this architecture mockup, we will return a simple text representation formatted as DOCX
  // and set the headers to trigger a download.

  const docContent = `MEETING MINUTES\n\nSummary:\n${minutes.summary}\n\nAgenda:\n${minutes.agenda}\n\nDecisions:\n${minutes.decisions}`;

  return new NextResponse(docContent, {
    headers: {
      'Content-Disposition': `attachment; filename="meeting_${meetingId}.docx"`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  });
}
