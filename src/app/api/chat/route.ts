import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatWithMeeting } from '@/lib/ai/llm';

export async function POST(req: Request) {
  try {
    const { meetingId, question } = await req.json();

    if (!meetingId || !question) {
      return NextResponse.json({ error: "Missing meetingId or question" }, { status: 400 });
    }

    // Fetch the transcript for context
    const transcript = await prisma.transcript.findUnique({
      where: { meetingId }
    });

    if (!transcript) {
      return NextResponse.json({ error: "Transcript not found" }, { status: 404 });
    }

    const answer = await chatWithMeeting(question, transcript.content);

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error("Error chatting with meeting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
