import { cn } from "@/utils";
import Button from "@/components/Button";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import { CardImageBox, CardTime, CardAddress, CardPay, CardDescription } from "@/components/ShopInfo/index";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ArticleProps {
  res: GetShopApplicationsResponse["items"];
  isLoading?: boolean;
  error?: boolean;
  bgColor: string;
  noticeId: string;
}

const JobInfoCard = ({ res, bgColor, noticeId, ...props }: ArticleProps) => {
  const item = res.length > 0 ? res[0].item : null;

  //페이지 링크

  const router = useRouter();
  const onHandleClick = () => {
    router.push(`/employer/jobinfo/${noticeId}/edit`); //공고편집하기로 가기
  };

  return (
    <>
      <p className="mb-8 text-16-bold text-primary">{item?.shop.item.category}</p>
      <h2 className="mb-24 text-20-bold tablet:text-28-bold">{item?.shop.item.name}</h2>
      <article
        className={cn(
          "flex flex-col gap-x-31 overflow-hidden rounded-12 border border-gray-20 bg-white p-24 desktop:h-356 desktop:flex-row",
          bgColor,
        )}
        {...props}
      >
        {item?.shop ? (
          <>
            <h3 className="hidden">근무조건</h3>
            <CardImageBox
              imageUrl={item.shop.item.imageUrl}
              startsAt={item.notice.item.startsAt}
              name={item.shop.item.name}
              closed={item.notice.item.closed}
              {...props}
            />
            <div className="flex flex-1 flex-col">
              <div className="pb-4 pt-16 text-14-bold text-red-40 tablet:text-16-bold">시급</div>
              <div className={"flex flex-col gap-y-8 tablet:gap-y-12"}>
                <CardPay
                  hourlyPay={item.notice.item.hourlyPay}
                  originalHourlyPay={item.shop.item.originalHourlyPay}
                  closed={item.notice.item.closed}
                  {...props}
                />
                <CardTime startsAt={item.notice.item.startsAt} workhour={item.notice.item.workhour} {...props} />
                <CardAddress address={item.shop.item.address1} {...props} />
                <CardDescription description={item.shop.item.description} {...props} />
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
          </>
        ) : (
          <LoadingSpinner />
        )}
      </article>

      <div className="mt-24 rounded-12">
        {item ? (
          <dl className="w-full bg-gray-10 p-30">
            <dt className="mb-12 text-16-bold">공고설명</dt>
            <dd className="leading-26">{item?.notice.item.description}</dd>
          </dl>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default JobInfoCard;
