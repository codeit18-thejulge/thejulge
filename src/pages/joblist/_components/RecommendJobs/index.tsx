import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import { getNoticesResponse } from "@/hooks/api/notice/useGetNoticesQuery";
import { GetMyInfoResponse } from "@/hooks/api/user/useGetMyInfoQuery";
import { SeoulAddress } from "@/types/global";
import Link from "next/link";
import React from "react";

type RecommendJobsProps = {
  userData?: GetMyInfoResponse;
  isUserDataLoading: boolean;
  recommendData?: getNoticesResponse;
  isRecommendDataLoading: boolean;
  keyword: string;
  userId?: string | null;
};

const RecommendJobs = ({
  userData,
  isUserDataLoading,
  recommendData,
  isRecommendDataLoading,
  keyword,
  userId,
}: RecommendJobsProps) => {
  const hasRecommendData = recommendData?.items && recommendData.items.length > 0;
  const hasUserAddress = !!userData?.item?.address;
  const isEmployee = userData?.item?.type === "employee";
  const isGuest = userData?.item?.type === undefined;
  const isKeywordEmpty = !keyword || keyword?.trim() === "";
  const recommendShow = isGuest || (isKeywordEmpty === true && isEmployee) ? true : false;

  const sortedRecommendData = recommendData?.items.sort((a, b) => {
    const A = new Date(a.item.startsAt);
    const B = new Date(b.item.startsAt);
    return B.getTime() - A.getTime();
  });
  return (
    <>
      {recommendShow ? (
        <div className="h-541 bg-green-20">
          <div className="mx-auto pl-12 mobile:max-w-350 tablet:max-w-678 tablet:pl-0 desktop:max-w-964">
            <h1 className="pt-60 text-20 font-bold tablet:text-28">맞춤 공고</h1>
            {userId ? (
              isUserDataLoading ? (
                <div className="flex justify-center pb-100 pt-40">
                  <LoadingSpinner />
                </div>
              ) : hasUserAddress ? (
                isRecommendDataLoading ? (
                  <div className="flex justify-center pb-100 pt-40">
                    <LoadingSpinner />
                  </div>
                ) : hasRecommendData ? (
                  <div className="flex gap-4 overflow-x-scroll pb-60 pt-31 scrollbar-hide tablet:gap-10">
                    {sortedRecommendData?.map((data) => (
                      <div key={data.item.id} className="flex-shrink-0">
                        <Link href={`/jobinfo/${data.item.shop.item.id}/${data.item.id}`}>
                          <Post
                            {...data.item}
                            {...data.item.shop.item}
                            address={data.item.shop.item.address1 as SeoulAddress}
                            className="tablet:h-348 tablet:w-312"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center pt-125">
                    <p className="text-18 font-bold tablet:text-26">
                      아쉽지만, 고객님 주소 주변에는 알바를 구하는 가게가 없습니다😔
                    </p>
                  </div>
                )
              ) : (
                <div className="flex justify-center pt-125">
                  <p className="text-18 font-bold tablet:text-26">프로필 등록을 해서 주소 맞춤 공고를 확인해보세요!</p>
                </div>
              )
            ) : (
              <div className="flex justify-center pt-125">
                <p className="text-18 font-bold tablet:text-26">
                  로그인과 프로필 등록을 해서 맞춤 공고를 확인해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecommendJobs;
