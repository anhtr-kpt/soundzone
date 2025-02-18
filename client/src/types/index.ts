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

export const urlRegex = /^https?:\/\/.+/;
export const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export interface IUploadResponse {
  url: string;
  publicId: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}
