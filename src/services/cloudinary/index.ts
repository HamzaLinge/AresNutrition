import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryUploadImage = async (imagePath: string) => {
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "supplements",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Error Cloudinary Image Upload");
  }
};

export const cloudinaryDeleteImage = async (imagePath: string) => {
  const publicId = imagePath.split("/").pop();
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

export const getAssetInfo = async (publicId: string) => {
  const options = {
    colors: true,
  };

  try {
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
    throw new Error("Error Cloudinary Asset Info");
  }
};

export const createImageTag = (publicId: string, ...colors: any) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};
