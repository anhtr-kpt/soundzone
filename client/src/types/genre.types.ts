import { ApiResponse } from "./common.types";

export interface Genre {
  _id: string;
  name: string;
  description: string;
}

export interface GenreState {
  genre: Genre | null;
}

export interface GenreResponse {
  success: boolean;
  message: string;
  data?: {
    genre: Genre;
  };
}

export interface CreateGenreRequest {
  name: string;
  description: string;
}

export interface GetGenresResponse extends ApiResponse {
  data?: { genres: Genre[] };
}
