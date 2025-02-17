// src/hooks/useArtists.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { artistService, type CreateArtistDTO } from "@/services/artist.service";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { createQueryKeys } from "@/lib/tanstack-query";

// export const artistKeys = {
//   all: ["artists"] as const,
//   lists: () => [...artistKeys.all, "list"] as const,
//   list: (filters: Record<string, unknown>) =>
//     [...artistKeys.lists(), filters] as const,
//   details: () => [...artistKeys.all, "detail"] as const,
//   detail: (id: string) => [...artistKeys.details(), id] as const,
// };

const artistKeys = createQueryKeys("artists");

export const useCreateArtist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateArtistDTO) => artistService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.lists() });
      toast({ description: "Artist created successfully!" });
      navigate("/artists");
    },
    onError: (error: Error) => {
      toast({ description: `Failed to create artist: ${error.message}` });
    },
  });
};
