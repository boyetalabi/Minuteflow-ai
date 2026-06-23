import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transcribeAudio } from '@/lib/ai/transcription';
import { generateMeetingMinutes } from '@/lib/ai/llm';

export async function POST(req: Request) {
  try {
    const { meetingId, audioUrl } = await req.json();

    if (!meetingId || !audioUrl) {
      return NextResponse.json({ error: "Missing meetingId or audioUrl" }, { status: 400 });
    }

    // 1. Update meeting status
    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: 'PROCESSING' }
    });

    // 2. Transcribe Audio & Diarize Speakers
    const transcriptionResult = await transcribeAudio(audioUrl);

    // Save Transcript
    await prisma.transcript.create({
      data: {
        meetingId,
        content: transcriptionResult.fullText
      }
    });

    // Save Speakers
    for (const speakerLabel of transcriptionResult.speakers) {
      await prisma.speaker.create({
        data: {
          meetingId,
          name: speakerLabel,
          label: speakerLabel
        }
      });
    }

    // 3. Generate Meeting Minutes via LLM
    const minutesResult = await generateMeetingMinutes(transcriptionResult.fullText);

    // Save Minutes
    await prisma.minutes.create({
      data: {
        meetingId,
        summary: minutesResult.summary,
        agenda: minutesResult.agenda,
        decisions: minutesResult.decisions,
      }
    });

    // Save Action Items
    for (const item of minutesResult.actionItems) {
      await prisma.actionItem.create({
        data: {
          meetingId,
          task: item.task,
          assignee: item.assignee,
          deadline: item.deadline ? new Date(item.deadline) : null,
          status: "pending"
        }
      });
    }

    // 4. Update meeting status to Completed
    const completedMeeting = await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: 'COMPLETED' }
    });

    return NextResponse.json({ success: true, meeting: completedMeeting });

  } catch (error: any) {
    console.error("Error processing meeting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
