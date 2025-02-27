export const urlRegex = /^https?:\/\/.+/;
export const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export interface ApiResponse {
  success: boolean;
  message: string;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  lastLogin?: Date;
  refreshToken: string;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  data: User;
}

export interface SignupResponse extends ApiResponse {
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ISongData {
  _id: string;
  title: string;
  artists: string[];
  composers: string[];
  genres: string[];
  thumbnail: string;
}

export interface IFormField {
  inputId: string;
  inputName: string;
  inputType: "text" | "password";
  inputPlaceholder: string;
  isMandatory?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}

export interface ITextArea {
  id: string;
  rows?: number;
  name: string;
  className?: string;
  placeholder: string;
}

export interface IInput {
  id: string;
  name: string;
  type: "text" | "password";
  placeholder: string;
  className?: string;
}

export interface ILabel {
  title: string;
  htmlFor: string;
  className?: string;
  isMandatory?: boolean;
}

export interface IUploadResponse {
  url: string;
  publicId: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  message: string;
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
}
