import { AxiosProgressEvent, CancelToken } from "axios";
import { audioAxios } from "@/lib/axios";

export interface UploadAudioSessionPayload {
  clientId: string;
  audioFile: File;
}

export interface UploadAudioSessionOptions {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  cancelToken?: CancelToken;
}

export interface UploadAudioSessionResponse {
  sessionId?: string;
  message?: string;
}

export async function uploadAudioSession(
  payload: UploadAudioSessionPayload,
  options?: UploadAudioSessionOptions
): Promise<UploadAudioSessionResponse> {
  const formData = new FormData();

  // Add audio file as 'audio_file'
  formData.append("audio_file", payload.audioFile);

  // Add payload as stringified JSON with client_id
  const payloadData = {
    client_id: payload.clientId,
  };
  formData.append("payload", JSON.stringify(payloadData));

  const { data } = await audioAxios.post<UploadAudioSessionResponse>(
    "/audio/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: options?.onUploadProgress,
      cancelToken: options?.cancelToken,
    }
  );

  return data;
}
