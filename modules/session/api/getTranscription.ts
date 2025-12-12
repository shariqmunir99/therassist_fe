import axios from "@/lib/axios";

export interface Transcription {
  id: string;
  sessionId: string;
  text: string;
  segments: TranscriptionSegment[];
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptionSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker: "client" | "therapist";
  emotion?: string;
  audioUrl: string;
}

export async function getTranscription(
  sessionId: string
): Promise<Transcription> {
  // TODO: Uncomment when backend is ready
  // const { data } = await axios.get<Transcription>(
  //   `/api/sessions/${sessionId}/transcription`
  // );
  // return data;

  // Mock data for development with realistic conversation segments
  return Promise.resolve({
    id: "transcription-1",
    sessionId,
    text: "Full transcription text content...",
    segments: [
      {
        id: "seg-1",
        startTime: 32,
        endTime: 45,
        text: "Yeah, I think that's where a lot of the anxiety stems from. It's the uncertainty of it all.",
        speaker: "client",
        emotion: "anxious",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        id: "seg-2",
        startTime: 65,
        endTime: 82,
        text: "It sounds like that uncertainty is a major source of distress. Let's explore what aspects of it are the most challenging for you right now.",
        speaker: "therapist",
        emotion: "empathetic",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        id: "seg-3",
        startTime: 135,
        endTime: 152,
        text: "I just feel like I'm stuck in a loop, you know? Every time I try to move forward, something pulls me back.",
        speaker: "client",
        emotion: "uncertain",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
      {
        id: "seg-4",
        startTime: 230,
        endTime: 255,
        text: "When you say 'pulls you back,' what does that feel like? Can you describe the sensation or the thoughts that come with it?",
        speaker: "therapist",
        emotion: "probing",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
      {
        id: "seg-5",
        startTime: 340,
        endTime: 362,
        text: "Maybe you're right. I haven't really thought about it from that perspective before. It does make sense when you put it that way.",
        speaker: "client",
        emotion: "reflective",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      },
    ],
    status: "completed",
    createdAt: "2023-10-26T10:00:00Z",
    updatedAt: "2023-10-26T11:00:00Z",
  });
}

export async function requestTranscription(sessionId: string): Promise<void> {
  // TODO: Uncomment when backend is ready
  // await axios.post(`/api/sessions/${sessionId}/transcription`);

  // Mock implementation for development
  console.log("Requesting transcription for session:", sessionId);
  return Promise.resolve();
}
