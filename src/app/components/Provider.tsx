"use client";

import { useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            // cacheTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children} <ReactQueryDevtools /></QueryClientProvider>
  );
}