import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useQueryErrorHandler = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "observerResultsUpdated" && event.query.state.error) {
        const error = event.query.state.error;
        if (error instanceof Error) {
          toast({ description: `Đã xảy ra lỗi: ${error.message}` });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, toast]);
};

export const createQueryKeys = (prefix: string) => {
  return {
    all: [prefix] as const,
    lists: () => [prefix, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [prefix, "list", filters] as const,
    details: () => [prefix, "detail"] as const,
    detail: (id: string) => [prefix, "detail", id] as const,
  };
};
