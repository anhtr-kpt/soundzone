import { api } from "./api";

export interface Artist {
  id: string;
  fullName: string;
  stageName: string;
  bio: string;
  dateOfBirth: Date;
  avatarUrl: {
    url: string;
    publicID: string;
  } | null;
  bannerUrl: {
    url: string;
    publicId: string;
  } | null;
  socialLinks?: {
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
  };
}

export type CreateArtistDTO = Omit<Artist, "id">;

export const artistService = {
  create: async (data: CreateArtistDTO) => {
    const response = await api.post<Artist>("/artists", data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<Artist[]>("/artists");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Artist>(`/artists/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Artist>) => {
    const response = await api.patch<Artist>(`/artists/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<void>(`/artists/${id}`);
    return response.data;
  },
};
