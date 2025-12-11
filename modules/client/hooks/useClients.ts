import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, GetClientsParams } from "../api/getClients";
import { createClient, CreateClientPayload } from "../api/createClient";
import { updateClient, UpdateClientPayload } from "../api/updateClient";
import { deleteClient } from "../api/deleteClient";

/**
 * Hook to fetch list of clients for a therapist
 */
export function useClients(params: GetClientsParams) {
  return useQuery({
    queryKey: ["clients", params.therapistId, params.page, params.limit],
    queryFn: () => getClients(params),
    enabled: !!params.therapistId,
  });
}

/**
 * Hook to create a new client
 */
export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: (newClient) => {
      // Invalidate the clients list for this therapist
      queryClient.invalidateQueries({
        queryKey: ["clients", newClient.therapistId],
      });
    },
  });
}

/**
 * Hook to update an existing client
 */
export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClientPayload) => updateClient(payload),
    onSuccess: (updatedClient) => {
      // Invalidate both the specific client and the clients list
      queryClient.invalidateQueries({
        queryKey: ["client", updatedClient.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["clients", updatedClient.therapistId],
      });
    },
  });
}

/**
 * Hook to delete a client
 */
export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: (_, deletedId) => {
      // Invalidate all clients queries
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
      // Remove the specific client from cache
      queryClient.removeQueries({
        queryKey: ["client", deletedId],
      });
    },
  });
}
