export interface MeetingMinutesResult {
  summary: string;
  agenda: string;
  decisions: string;
  actionItems: { task: string; assignee: string; deadline?: string }[];
}

/**
 * Simulates calling an LLM API (e.g., OpenAI GPT-4)
 * to generate professional meeting minutes from a transcript.
 */
export async function generateMeetingMinutes(transcript: string): Promise<MeetingMinutesResult> {
  // Simulate network delay for LLM generation
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    summary: "The team discussed the upcoming product launch timeline. Backend development is completed, and the focus is shifting to frontend UI components and authentication.",
    agenda: "1. Product launch timeline\n2. Backend deployment\n3. Frontend UI assignments",
    decisions: "- Product launch target is set for Friday.\n- Authentication will use NextAuth.",
    actionItems: [
      { task: "Complete dashboard components", assignee: "Speaker 3" },
      { task: "Integrate NextAuth", assignee: "Speaker 2", deadline: "Tomorrow morning" },
    ]
  };
}

/**
 * Simulates a Chat with Meeting feature using an LLM.
 */
export async function chatWithMeeting(question: string, transcript: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (question.toLowerCase().includes("deadline") || question.toLowerCase().includes("friday")) {
    return "The team agreed to complete the product by Friday.";
  }
  
  if (question.toLowerCase().includes("backend")) {
    return "Speaker 2 mentioned that the Backend API is already completed.";
  }

  return "Based on the meeting transcript, I don't have enough context to answer that question specifically. They mainly discussed the launch timeline, backend status, and frontend assignments.";
}
