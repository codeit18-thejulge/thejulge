import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
}

const PostImage = ({ imageUrl }: Props) => {
  return (
    <div className="relative h-full w-full">
      <Image src={imageUrl} alt="가게 이미지" fill className="h-full w-full rounded-lg object-cover" />
    </div>
  );
};

export default PostImage;
