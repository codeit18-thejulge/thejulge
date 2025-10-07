import { UserType } from "@/types/global";
import Button from "@/components/Button";
import { cn } from "@/utils";
import CardWrap from "../components/CardWrap";
import {
  CardBody,
  CardImageBox,
  CardCategory,
  CardTitle,
  CardAddress,
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

const ShopInfoCard = ({
  category,
  name,
  description,
  imageUrl,
  address,
  bgColor,
  closed = false,
  ...props
}: CARD_PROPS) => {
  return (
    <CardWrap bgColor={bgColor || ""} {...props}>
      <CardImageBox imageUrl={imageUrl} name={name} closed={closed} {...props} />
      <CardBody>
        <CardCategory category={category} {...props} />
        <CardTextBox>
          <CardTitle name={name} {...props} />
          <CardAddress address={address} {...props} />
          <CardDescription description={description} {...props} />
        </CardTextBox>
        <CardButtonBox>
          <Button status={"lined"} className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}>
            편집하기
          </Button>
          <Button status={"filled"} className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}>
            공고 등록하기
          </Button>
        </CardButtonBox>
      </CardBody>
    </CardWrap>
  );
};

export default ShopInfoCard;
