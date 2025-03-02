import { ApiResponse } from "./common.types";

export interface Artist {
  _id: string;
  realName: string;
  stageName: string;
  slug: string;
  biography: string;
  dateOfBirth: Date;
  avatarUrl: string;
  socialLinks?: {
    facebookUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
  };
  followerCount: number;
}

export interface ArtistState {
  artist: Artist | null;
}

export interface ArtistResponse {
  success: boolean;
  message: string;
  data?: {
    artist: Artist;
  };
}

export interface CreateArtistRequest {
  realName: string;
  stageName: string;
  biography: string;
  dateOfBirth: Date;
  avatarUrl: string;
  socialLinks?: {
    facebookUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
  };
}

export interface GetArtistsResponse extends ApiResponse {
  data?: { artists: Artist[] };
}
