import { UserType } from "@/types/global";
import PayBadge from "@/components/Badge/PayBadge";
import { cn } from "@/utils";
import styles from "@/styles/scrollNone.module.css";
import IcTime from "@/assets/svgs/ic_time.svg";
import IcArea from "@/assets/svgs/ic_area.svg";
import Image from "next/image";

interface CARD_PROPS {
  userType?: UserType;
  category?: string;
  name?: string;
  time?: string;
  description?: string;
  address?: string;
  imageUrl?: string;
  hourlyPay?: number;
  originalHourlyPay?: number;
  children?: React.ReactNode;
  closed?: boolean;
  bgColor?: string;
  workHour?: number;
}

const responseText = "text-14-regular tablet:text-16-regular";

// 가게 상세
const CardBody = ({ children, ...props }: CARD_PROPS) => {
  return (
    <div className="flex flex-1 flex-col" {...props}>
      {children}
    </div>
  );
};

//가게 이미지
const CardImageBox = ({ imageUrl = "", name = "", closed }: CARD_PROPS) => {
  return (
    <div className="relative h-177 w-full overflow-hidden rounded-12 tablet:h-360 desktop:h-full desktop:max-w-539">
      <Image layout="fill" objectFit="cover" src={imageUrl} alt={name} />
      {closed && (
        <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.7)] text-28-bold text-gray-30">
          마감완료
        </div>
      )}
    </div>
  );
};

//카테고리 & 정렬기준
const CardCategory = ({ category = "" }: CARD_PROPS) => {
  return <div className="pb-4 pt-16 text-14-bold text-red-40 tablet:text-16-bold">{category}</div>;
};

//가게 이름
const CardTitle = ({ name }: CARD_PROPS) => {
  return (
    <div className="flex items-center gap-8">
      <div className="text-24-bold tablet:text-28-bold">{name}</div>
    </div>
  );
};

//가게 주소
const CardAddress = ({ address = "" }: CARD_PROPS) => {
  return (
    <div className={cn("flex items-center gap-6 text-gray-50", responseText)}>
      <IcArea className={"h-16 w-13 tablet:h-20 tablet:w-16"} />
      <span className={"mt-2"}>{address}</span>
    </div>
  );
};

const CardTime = ({ time = "", workHour = 0 }: CARD_PROPS) => {
  const date = new Date(time);

  // 시간과 분을 추출
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // 두 자리 수로 포맷팅
  const startTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  let workTime = hours + workHour;
  if (workTime > 24) {
    workTime = workTime - 24;
  }
  const endTime = `${workTime.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return (
    <div className="leading-0 flex items-center gap-8 text-gray-50">
      <IcTime className={"h-16 w-16 tablet:h-20 tablet:w-20"} />
      {new Date(time).toLocaleDateString()} {startTime} ~ {endTime} ({workHour}시간)
    </div>
  );
};

//시급
const CardPay = ({ hourlyPay = 0, originalHourlyPay = 0, closed = false, ...props }: CARD_PROPS) => {
  return (
    <div className="flex items-center gap-8">
      <div className="text-24-bold tablet:text-28-bold">{hourlyPay.toLocaleString()}원</div>
      <PayBadge hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} {...props} />
    </div>
  );
};

//가게 설명
const CardDescription = ({ description = "", ...props }: CARD_PROPS) => {
  return (
    <p
      className={cn(
        "leading-22 tablet:leading-26 overflow-auto whitespace-pre-wrap desktop:max-h-74",
        responseText,
        styles.scrollbar,
      )}
      {...props}
    >
      {description}
    </p>
  );
};

// col
const CardTextBox = ({ children, ...props }: CARD_PROPS) => {
  return (
    <div className={"flex flex-col gap-y-8 tablet:gap-y-12"} {...props}>
      {children}
    </div>
  );
};

//버튼 박스
const CardButtonBox = ({ children, ...props }: CARD_PROPS) => {
  return (
    <div className="mt-24 flex w-full gap-x-8 whitespace-nowrap tablet:mt-40 desktop:mt-auto" {...props}>
      {children}
    </div>
  );
};

export {
  CardBody,
  CardImageBox,
  CardCategory,
  CardTitle,
  CardTime,
  CardAddress,
  CardPay,
  CardDescription,
  CardButtonBox,
  CardTextBox,
};
