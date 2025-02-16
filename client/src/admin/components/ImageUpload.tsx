import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { IUploadResponse } from "@/types";

interface ImageUploadProps {
  onUploadComplete: (response: IUploadResponse) => void;
  onUploadError: (error: Error) => void;
}

export const ImageUpload = ({
  onUploadComplete,
  onUploadError,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      setUploading(true);

      const response = await uploadToCloudinary(file, (progress) => {
        setProgress(progress);
      });

      onUploadComplete(response);
    } catch (error) {
      onUploadError(error as Error);
    } finally {
      setUploading(false);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="text-sm text-gray-500">
                Click to upload image
              </span>
            </div>
          </label>
        </div>

        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-48 rounded-lg"
            />
          </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-gray-500">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
};
