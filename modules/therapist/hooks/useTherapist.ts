import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTherapist, getTherapistProfile } from '../api/getTherapist';
import { updateTherapist, UpdateTherapistPayload } from '../api/updateTherapist';
import { searchTherapists, SearchTherapistsParams } from '../api/searchTherapists';

export function useTherapist(id: string) {
  return useQuery({
    queryKey: ['therapist', id],
    queryFn: () => getTherapist(id),
    enabled: !!id,
  });
}

export function useTherapistProfile() {
  return useQuery({
    queryKey: ['therapist', 'me'],
    queryFn: getTherapistProfile,
  });
}

export function useUpdateTherapist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTherapistPayload }) =>
      updateTherapist(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['therapist', data.id] });
      queryClient.invalidateQueries({ queryKey: ['therapist', 'me'] });
    },
  });
}

export function useSearchTherapists(params: SearchTherapistsParams) {
  return useQuery({
    queryKey: ['therapists', 'search', params],
    queryFn: () => searchTherapists(params),
  });
}
