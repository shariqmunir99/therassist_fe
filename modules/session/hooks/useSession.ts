import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSessions, getSession, GetSessionsParams } from '../api/getSessions';
import { uploadSession, UploadSessionPayload } from '../api/uploadSession';
import { getTranscription, requestTranscription } from '../api/getTranscription';

export function useSessions(params: GetSessionsParams) {
  return useQuery({
    queryKey: ['sessions', params],
    queryFn: () => getSessions(params),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
    enabled: !!id,
  });
}

export function useUploadSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadSessionPayload) => uploadSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useTranscription(sessionId: string) {
  return useQuery({
    queryKey: ['transcription', sessionId],
    queryFn: () => getTranscription(sessionId),
    enabled: !!sessionId,
  });
}

export function useRequestTranscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => requestTranscription(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ['transcription', sessionId] });
      queryClient.invalidateQueries({ queryKey: ['session', sessionId] });
    },
  });
}
