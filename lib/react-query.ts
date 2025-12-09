import { QueryClient } from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        if (failureCount >= 3) return false;

        // Retry only for server errors
        const status = error.status;
        if (status === 401 || status === 403) return false; // no retry
        if (status >= 500) return true; // retry server errors
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error: any) => {
        if (failureCount >= 3) return false;

        // Retry only for server errors
        const status = error.status;
        if (status === 401 || status === 403) return false; // no retry
        if (status >= 500) return true; // retry server errors
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
