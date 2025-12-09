import { useQuery } from '@tanstack/react-query';
import { getAvailability, getMyAvailability } from '../api/getAvailability';

export function useAvailability(therapistId: string) {
  return useQuery({
    queryKey: ['availability', therapistId],
    queryFn: () => getAvailability(therapistId),
    enabled: !!therapistId,
  });
}

export function useMyAvailability() {
  return useQuery({
    queryKey: ['availability', 'me'],
    queryFn: getMyAvailability,
  });
}
