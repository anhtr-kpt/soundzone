import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { IUploadResponse } from "@/types";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onUploadComplete: (response: IUploadResponse) => void;
  onUploadError: (error: Error) => void;
  type: "avatar" | "banner";
}

export const ImageUpload = ({
  onUploadComplete,
  onUploadError,
  type,
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
    <div className="space-y-4 mx-auto">
      <div className="flex flex-col gap-4">
        {preview &&
          (type === "avatar" ? (
            <div className="border border-neutral-200 dark:border-neutral-800 w-fit rounded-full">
              <img
                src={preview}
                alt="Preview"
                className="aspect-square size-64 rounded-full"
              />
            </div>
          ) : (
            <div className="border border-neutral-200 dark:border-neutral-800 w-full">
              <img src={preview} alt="Preview" className="aspect-25/9 w-full" />
            </div>
          ))}
        <div className="mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`${type}-upload`}
          />
          <label
            htmlFor={`${type}-upload`}
            className="rounded-md transition-colors h-9 inline-flex px-5 py-1 items-center justify-center gap-2 text-sm font-medium border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
          >
            <Upload strokeWidth={1.5} size={18} />
            <span className="">Upload {type}</span>
          </label>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
};
