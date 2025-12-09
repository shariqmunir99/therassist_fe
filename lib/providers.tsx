/**
 * React Query Provider
 *
 * Client-side provider wrapper for React Query QueryClient
 */

"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
