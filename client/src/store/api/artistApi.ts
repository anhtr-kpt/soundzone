import {
  CreateArtistRequest,
  ArtistResponse,
  GetArtistsResponse,
} from "@/types/artist.types";
import { apiSlice } from "./apiSlice";

export const ArtistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtist: builder.mutation<ArtistResponse, CreateArtistRequest>({
      query: (data) => ({
        url: "/artists",
        method: "POST",
        body: data,
      }),
    }),
    getArtists: builder.query<GetArtistsResponse, void>({
      query: () => ({
        url: "/artists",
        method: "GET",
      }),
    }),
    getArtistBySlug: builder.query<ArtistResponse, string>({
      query: (slug) => ({
        url: `/artists/${slug}`,
        method: "GET",
      }),
    }),
    updateArtist: builder.mutation<ArtistResponse, string>({
      query: (id) => ({
        url: `/artists/${id}`,
        method: "PUT",
      }),
    }),
    deleteArtist: builder.mutation<ArtistResponse, string>({
      query: (id) => ({
        url: `/artists/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateArtistMutation,
  useGetArtistBySlugQuery,
  useGetArtistsQuery,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = ArtistApi;
