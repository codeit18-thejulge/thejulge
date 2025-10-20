import { isStartTimePassed } from "@/utils/formatTime";
import PayBadge from "@/components/Badge/PayBadge";
import { formatNoticeTime } from "@/utils/formatTime";
import { cn } from "@/utils";
import IcClock from "@/assets/svgs/ic_clock.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import Image from "next/image";

const RESPONSE_TEXT = "text-14-regular tablet:text-16-regular";

//가게 이미지
interface CardImage {
  startsAt: string;
  imageUrl: string;
  name: string;
  closed: boolean;
  className?: string;
}
const CardImageBox = ({ imageUrl = "", startsAt, name = "", closed, className }: CardImage) => {
  const isPassed = isStartTimePassed(startsAt);
  return (
    <div
      className={cn(
        "relative h-177 w-full overflow-hidden rounded-12 tablet:h-360 desktop:h-full desktop:max-w-539",
        className,
      )}
    >
      <Image layout="fill" objectFit="cover" src={imageUrl} alt={name} />
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

//카테고리 & 정렬기준
interface CardCategory {
  category: string;
}

const CardCategory = ({ category = "" }: CardCategory) => {
  return <div className="pb-4 pt-16 text-14-bold text-primary tablet:text-16-bold">{category}</div>;
};

//가게 이름
interface CardTitle {
  name: string;
}

const CardTitle = ({ name }: CardTitle) => {
  return (
    <div className="flex items-center gap-8">
      <h3 className="text-24-bold tablet:text-28-bold">{name}</h3>
    </div>
  );
};

//가게 주소
interface CardAddress {
  address: string;
}
const CardAddress = ({ address = "" }: CardAddress) => {
  return (
    <p className={cn("flex items-center gap-6 text-gray-50", RESPONSE_TEXT)}>
      <IcAddress className={"h-16 w-13 text-primary tablet:h-20 tablet:w-16"} />
      <span className={"mt-2"}>{address}</span>
    </p>
  );
};

// 근무 시간
interface CardWorkTime {
  startsAt: string;
  workhour: number;
}

const CardTime = ({ startsAt = "2025-10-11T21:00:00Z", workhour: workHour = 3 }: CardWorkTime) => {
  formatNoticeTime(startsAt, workHour);

  return (
    <p className="leading-0 flex items-center gap-8 text-gray-50">
      <IcClock className={"h-16 w-16 text-primary tablet:h-20 tablet:w-20"} />
      <span>
        {formatNoticeTime(startsAt, workHour)} ({workHour}시간)
      </span>
    </p>
  );
};

//시급
interface CardPay {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
}

const CardPay = ({ hourlyPay = 0, originalHourlyPay = 0, closed = false, ...props }: CardPay) => {
  return (
    <div className="flex items-center gap-8">
      <p className="text-24-bold tablet:text-28-bold">{hourlyPay.toLocaleString()}원</p>
      <PayBadge hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} {...props} />
    </div>
  );
};

//가게 설명
interface CardDescription {
  description?: string;
}

const CardDescription = ({ description = "", ...props }: CardDescription) => {
  return (
    <p
      className={cn(
        "leading-22 tablet:leading-26 overflow-auto whitespace-pre-wrap desktop:max-h-74",
        RESPONSE_TEXT,
        "textOverScroll",
      )}
      {...props}
    >
      {description}
    </p>
  );
};

export { CardImageBox, CardCategory, CardTitle, CardTime, CardAddress, CardPay, CardDescription };
