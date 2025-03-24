import Image from "next/image";
import React from "react";
//pr생성용 주석추가

const MainImagePreview = ({
  previewUrl,
  handleRemoveImage,
}: {
  previewUrl: string;
  handleRemoveImage: (e: React.MouseEvent) => void;
}) => {
  return (
    <>
      {/* 이미지 미리보기 영역 */}
      {previewUrl && (
        <div className="mt-3 relative inline-block">
          <div className="relative border border-gray-400 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="미리보기"
              className="max-h-32 max-w-full object-contain"
              width={300}
              height={300}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
            >
              {/*이미지 미리 보기에 이미지를 지우는 x버튼 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainImagePreview;
