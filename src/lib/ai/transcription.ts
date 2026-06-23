export interface TranscriptSentence {
  timestamp: string;
  speaker: string;
  text: string;
}

export interface TranscriptionResult {
  fullText: string;
  sentences: TranscriptSentence[];
  speakers: string[];
}

/**
 * Simulates calling a Speech-to-Text API (e.g., Deepgram, Whisper)
 * with Speaker Diarization enabled.
 */
export async function transcribeAudio(audioFileUrl: string): Promise<TranscriptionResult> {
  // Simulate network delay for API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const sentences: TranscriptSentence[] = [
    { timestamp: "00:01:12", speaker: "Speaker 1", text: "We need to complete the product by Friday." },
    { timestamp: "00:01:16", speaker: "Speaker 2", text: "Backend API is already completed." },
    { timestamp: "00:01:20", speaker: "Speaker 1", text: "Excellent. Let's focus on the frontend UI next." },
    { timestamp: "00:01:45", speaker: "Speaker 3", text: "I can take the dashboard components if someone else handles authentication." },
    { timestamp: "00:02:10", speaker: "Speaker 2", text: "I will integrate NextAuth by tomorrow morning." },
  ];

  const fullText = sentences.map(s => `[${s.timestamp}] ${s.speaker}: ${s.text}`).join('\n\n');
  const speakers = Array.from(new Set(sentences.map(s => s.speaker)));

  return {
    fullText,
    sentences,
    speakers,
  };
}
