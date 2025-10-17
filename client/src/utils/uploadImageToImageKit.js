import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImageToImageKit = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in uploading the image.", error);
    throw error;
  }
};

export default uploadImageToImageKit;
