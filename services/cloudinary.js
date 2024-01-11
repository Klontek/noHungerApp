import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: "dzf4sqvow",
//   api_key: "692992372292581",
//   api_secret: "UMcY9Gk_ANhraHPGjQY9ge16bYw",
// });
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Cloudinary upload function
// Cloudinary upload function
export const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) {
            console.log({ msg: "Cloudinary upload error", error: error });
            reject(error);
          } else {
            console.log({ msg: "Cloudinary upload success", result: result });
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

// Cloudinary delete function
export const removeFromCloudinary = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, (error, result) => {
    console.log(result, error);
  });
};
