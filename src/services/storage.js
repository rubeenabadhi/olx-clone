const CLOUD_NAME = "dzptek9ma";
const UPLOAD_PRESET = "products";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

export const uploadProductImages = async (files) => {
  const uploadPromises = files.map((file) => uploadProductImage(file));
  return Promise.all(uploadPromises);
};