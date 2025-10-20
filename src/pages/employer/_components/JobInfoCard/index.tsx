import { cn } from "@/utils";
import Button from "@/components/Button";
import { GetShopNoticeDetailResponse } from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import { CardImageBox, CardTime, CardAddress, CardPay, CardDescription } from "@/components/ShopInfo/index";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ArticleProps {
  res?: GetShopNoticeDetailResponse["item"];
  isLoading?: boolean;
  error?: boolean;
  bgColor: string;
  noticeId: string;
}

const JobInfoCard = ({ res, bgColor, noticeId, ...props }: ArticleProps) => {
  //페이지 링크

  const router = useRouter();
  const onHandleClick = () => {
    router.push(`/employer/jobinfo/${noticeId}/edit`); //공고편집하기로 가기
  };

  return (
    <>
      {res?.shop && res.shop.item && (
        <>
          <p className="mb-8 text-16-bold text-primary">{res.shop.item.category}</p>
          <h2 className="mb-24 text-20-bold tablet:text-28-bold">{res.shop.item.name}</h2>
          <article
            className={cn(
              "flex flex-col gap-x-31 overflow-hidden rounded-12 border border-gray-20 bg-white p-24 desktop:h-356 desktop:flex-row",
              bgColor,
            )}
            {...props}
          >
            {res.shop ? (
              <>
                <h3 className="hidden">근무조건</h3>
                <CardImageBox
                  imageUrl={res.shop.item.imageUrl}
                  startsAt={res.startsAt}
                  name={res.shop.item.name}
                  closed={res.closed}
                  {...props}
                />
                <div className="flex flex-1 flex-col">
                  <div className="pb-4 pt-16 text-14-bold text-red-40 tablet:text-16-bold">시급</div>
                  <div className={"flex flex-col gap-y-8 tablet:gap-y-12"}>
                    <CardPay
                      hourlyPay={res.hourlyPay}
                      originalHourlyPay={res.shop.item.originalHourlyPay}
                      closed={res.closed}
                      {...props}
                    />
                    <CardTime startsAt={res.startsAt} workhour={res.workhour} {...props} />
                    <CardAddress address={res.shop.item.address1} {...props} />
                    <CardDescription description={res.description} {...props} />
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
            {res ? (
              <dl className="w-full bg-gray-10 p-30">
                <dt className="mb-12 text-16-bold">공고설명</dt>
                <dd className="leading-26">{res.description}</dd>
              </dl>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default JobInfoCard;
