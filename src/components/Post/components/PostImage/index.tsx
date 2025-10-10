import { isStartTimePassed } from "@/utils/formatTime";
import Image from "next/image";
import React from "react";

interface Props {
  startsAt: string;
  imageUrl: string;
  closed: boolean;
}

/*
!isPassed && closed: 지난 공고이면서 마감완료일 때는 지난 공고만 띄우도록 결정
*/

const PostImage = ({ startsAt, imageUrl, closed }: Props) => {
  const isPassed = isStartTimePassed(startsAt);

  return (
    <div className="relative h-full w-full flex-[2]">
      <Image src={imageUrl} alt="가게 이미지" fill className="h-full w-full rounded-xl object-cover" />
      {isPassed && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-70">
          <span className="px-4 py-2 text-28-bold text-gray-30">지난 공고</span>
        </div>
      )}

      {!isPassed && closed && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-70">
          <span className="px-4 py-2 text-28-bold text-gray-30">마감 완료</span>
        </div>
      )}
    </div>
  );
};

export default PostImage;
