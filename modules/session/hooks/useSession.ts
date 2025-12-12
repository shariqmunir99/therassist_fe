import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSessions, getSession, GetSessionsParams } from "../api/getSessions";
import {
  uploadSession,
  UploadSessionPayload,
  UploadSessionOptions,
} from "../api/uploadSession";
import {
  uploadAudioSession,
  UploadAudioSessionPayload,
  UploadAudioSessionOptions,
} from "../api/uploadAudioSession";
import {
  getTranscription,
  requestTranscription,
} from "../api/getTranscription";
import {
  getSessionInsights,
  getMockSessionInsights,
} from "../api/getSessionInsights";
import { updateSessionNotes } from "../api/updateSessionNotes";
import { getSessionsByClient } from "../api/getSessionsByClient";
import {
  getUtterances,
  GetUtterancesPayload,
  GetUtterancesResponse,
} from "../api/getUtterances";

export function useSessions(params: GetSessionsParams) {
  return useQuery({
    queryKey: ["sessions", params],
    queryFn: () => getSessions(params),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => getSession(id),
    enabled: !!id,
  });
}

export function useClientSessions(clientId: string, therapistId: string) {
  return useQuery({
    queryKey: ["client-sessions", clientId],
    queryFn: () => getSessionsByClient(clientId, therapistId),
    enabled: !!clientId && !!therapistId,
  });
}

export function useSessionInsights(sessionId: string, useMock = false) {
  return useQuery({
    queryKey: ["sessionInsights", sessionId],
    queryFn: () =>
      useMock
        ? getMockSessionInsights(sessionId)
        : getSessionInsights(sessionId),
    enabled: !!sessionId,
  });
}

export function useUploadSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      ...options
    }: { payload: UploadAudioSessionPayload } & UploadAudioSessionOptions) =>
      uploadAudioSession(payload, options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

export function useUpdateSessionNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSessionNotes,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["session", variables.sessionId],
      });
    },
  });
}

export function useTranscription(sessionId: string) {
  return useQuery({
    queryKey: ["transcription", sessionId],
    queryFn: () => getTranscription(sessionId),
    enabled: !!sessionId,
  });
}

export function useRequestTranscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => requestTranscription(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["transcription", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
    },
  });
}

/**
 * Hook to fetch paginated utterances for a session
 * Uses React Query's useQuery with infinite scroll pattern support
 */
export function useUtterances(
  sessionId: string,
  pageNo: number = 1,
  pageSize: number = 20
) {
  return useQuery({
    queryKey: ["utterances", sessionId, pageNo, pageSize],
    queryFn: () =>
      getUtterances({
        session_id: sessionId,
        page_no: pageNo,
        page_size: pageSize,
      }),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
