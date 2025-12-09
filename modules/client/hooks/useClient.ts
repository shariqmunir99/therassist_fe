import { useQuery } from '@tanstack/react-query';
import { getClient, getClientProfile } from '../api/getClient';

export function useClient(id: string) {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });
}

export function useClientProfile() {
  return useQuery({
    queryKey: ['client', 'me'],
    queryFn: getClientProfile,
  });
}
