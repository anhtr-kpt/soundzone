import {
  CreateGenreRequest,
  GenreResponse,
  GetGenresResponse,
} from "@/types/genre.types";
import { apiSlice } from "./apiSlice";

export const genreApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation<GenreResponse, CreateGenreRequest>({
      query: (data) => ({
        url: "/genres",
        method: "POST",
        body: data,
      }),
    }),
    getGenres: builder.query<GetGenresResponse, void>({
      query: () => ({
        url: "/genres",
        method: "GET",
      }),
    }),
    getGenreById: builder.query<GenreResponse, string>({
      query: (id) => ({
        url: `/genres/${id}`,
        method: "GET",
      }),
    }),
    updateGenre: builder.mutation<GenreResponse, string>({
      query: (id) => ({
        url: `/genres/${id}`,
        method: "PUT",
      }),
    }),
    deleteGenre: builder.mutation<GenreResponse, string>({
      query: (id) => ({
        url: `/genres/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useGetGenreByIdQuery,
  useGetGenresQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApi;
