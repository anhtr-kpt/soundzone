import { v2 as cloudinary } from "cloudinary";
import Readable from "stream";

const uploadToCloudinary = async (buffer, folder, resource_type = "auto") => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      const readableStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export default uploadToCloudinary;
