import { UserType, NoticeSort, NoticeItem } from "@/types/global";
import Button from "@/components/Button";
import { cn } from "@/utils";
import { CardImageBox, CardCategory, CardTime, CardAddress, CardPay, CardDescription } from "..";

//페이지에서 사용시 예시 입니다.
interface CARD_PROPS extends NoticeItem {
  userType: UserType;
  category: NoticeSort;
  name: string;
  address: string;
  imageUrl: string;
  originalHourlyPay: number;
  bgColor: string;
  onHandleClick: () => void;
}

const ShopNoticeCard = ({
  name,
  description,
  imageUrl,
  address,
  bgColor,
  startsAt,
  workhour,
  hourlyPay,
  originalHourlyPay,
  closed = false,
  onHandleClick,
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
      <h3 className="hidden">근무조건</h3>
      <CardImageBox imageUrl={imageUrl} name={name} closed={closed} {...props} />
      <div className="flex flex-1 flex-col">
        <div className="pb-4 pt-16 text-14-bold text-red-40 tablet:text-16-bold">시급</div>
        <div className={"flex flex-col gap-y-8 tablet:gap-y-12"}>
          <CardPay hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} {...props} />
          <CardTime startsAt={startsAt} workhour={workhour} {...props} />
          <CardAddress address={address} {...props} />
          <CardDescription description={description} {...props} />
        </div>
        <div className="mt-24 flex w-full gap-x-8 whitespace-nowrap tablet:mt-40 desktop:mt-auto">
          <Button
            status={"lined"}
            className={cn("h-38 text-14-regular tablet:h-48 tablet:text-16-bold")}
            onClick={onHandleClick}
          >
            공고 편집하기
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ShopNoticeCard;
