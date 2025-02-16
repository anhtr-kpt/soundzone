import { CLOUDINARY_CONFIG } from "@/config/cloudinary";
import { IUploadResponse } from "@/types";

export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<IUploadResponse> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset as string);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = Math.round((e.loaded * 100) / e.total);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response);
        resolve({
          url: response.secure_url,
          publicId: response.public_id,
        });
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.open("POST", CLOUDINARY_CONFIG.uploadUrl as string);
    xhr.send(formData);
  });
};
