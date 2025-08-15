import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 relative rounded-full cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full absolute bottom-0 right-0 border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile photo"
            className="w-20 h-20 object-cover rounded-full"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
