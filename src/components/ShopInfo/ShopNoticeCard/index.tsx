import { UserType } from "@/types/global";
import Button from "@/components/Button";
import { cn } from "@/utils";
import CardWrap from "../components/CardWrap";
import {
  CardBody,
  CardImageBox,
  CardCategory,
  CardTime,
  CardAddress,
  CardPay,
  CardDescription,
  CardTextBox,
  CardButtonBox,
} from "../components/CardBody";
//페이지에서 사용시 예시 입니다.
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

const ShopNoticeCard = ({
  category,
  name,
  description,
  imageUrl,
  address,
  bgColor,
  time,
  workHour,
  closed = false,
}: CARD_PROPS) => {
  return (
    <CardWrap bgColor={bgColor || ""}>
      <CardImageBox imageUrl={imageUrl} name={name} closed={closed} />
      <CardBody>
        <CardCategory category={category} />
        <CardTextBox>
          <CardPay hourlyPay={15000} originalHourlyPay={10000} closed={closed} />
          <CardTime time={time} workHour={workHour} />
          <CardAddress address={address} />
          <CardDescription description={description} />
        </CardTextBox>
        <CardButtonBox>
          <Button status={"lined"} className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}>
            공고 편집하기
          </Button>
        </CardButtonBox>
      </CardBody>
    </CardWrap>
  );
};

export default ShopNoticeCard;
