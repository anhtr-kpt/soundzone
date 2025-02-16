export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  uploadUrl: `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload`,
};
