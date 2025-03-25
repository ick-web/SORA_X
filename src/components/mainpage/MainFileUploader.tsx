import React, { ChangeEvent, RefObject } from "react";

interface MainFileUploaderProps {
  fileInputRef: RefObject<HTMLInputElement>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MainFileUploader: React.FC<MainFileUploaderProps> = ({
  fileInputRef,
  handleImageChange,
}) => {
  return (
    <input
      ref={fileInputRef}
      type="file"
      className="hidden"
      accept="image/*"
      onChange={handleImageChange}
    />
  );
};

export default MainFileUploader;
