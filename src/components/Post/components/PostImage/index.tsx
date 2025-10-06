import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
  closed: boolean;
}

const PostImage = ({ imageUrl, closed }: Props) => {
  return (
    <div className="relative h-full w-full">
      <Image src={imageUrl} alt="가게 이미지" fill className="h-full w-full rounded-xl object-cover" />

      {closed && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-70">
          <span className="px-4 py-2 text-28-bold text-gray-30">마감 완료</span>
        </div>
      )}
    </div>
  );
};

export default PostImage;
