import { UserType, ShopCategory } from "@/types/global";
import Button from "@/components/Button";
import { cn } from "@/utils";
import { CardImageBox, CardCategory, CardTitle, CardAddress, CardDescription } from "../components/CardBody";

//페이지에서 사용시 예시 입니다.
interface CARD_PROPS {
  userType: UserType;
  category: ShopCategory;
  name: string;
  time: string;
  description: string;
  address: string;
  imageUrl: string;
  hourlyPay: number;
  originalHourlyPay?: number;
  children: React.ReactNode;
  closed: boolean;
  bgColor: string;
  workHour: number;
  onHandleEditClick: () => void;
  onHandleRegistrationClick: () => void;
}

const ShopInfoCard = ({
  category,
  name,
  description,
  imageUrl,
  address,
  bgColor,
  closed = false,
  onHandleEditClick,
  onHandleRegistrationClick,
  ...props
}: CARD_PROPS) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-x-31 overflow-hidden rounded-12 bg-white p-24 desktop:h-356 desktop:flex-row",
        bgColor,
      )}
      {...props}
    >
      <CardImageBox imageUrl={imageUrl} name={name} closed={closed} {...props} />
      <div className="flex flex-1 flex-col">
        <CardCategory category={category} {...props} />
        <div className={"flex flex-col gap-y-8 tablet:gap-y-12"}>
          <CardTitle name={name} {...props} />
          <CardAddress address={address} {...props} />
          <CardDescription description={description} {...props} />
        </div>
        <div className="mt-24 flex w-full gap-x-8 whitespace-nowrap tablet:mt-40 desktop:mt-auto">
          <Button
            status={"lined"}
            className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}
            onClick={onHandleEditClick}
          >
            편집하기
          </Button>
          <Button
            status={"filled"}
            className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}
            onClick={onHandleRegistrationClick}
          >
            공고 등록하기
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ShopInfoCard;
