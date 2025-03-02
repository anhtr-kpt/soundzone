export interface ApiResponse {
  success: boolean;
  message?: string;
}

export interface UploadResponse {
  secure_url: string;
  public_id: string;
}

export const urlRegex =
  /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}(:\d{1,5})?(\/[^\s]*)?$/;
