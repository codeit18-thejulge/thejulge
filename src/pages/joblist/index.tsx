import Filter from "@/pages/joblist/_components/Filter";
import Layout from "@/components/Layout";
import ListPagination from "@/components/ListPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import SelectBox from "@/components/SelectBox";
import { SORT_OPTIONS } from "@/constants/SORT_OPTIONS";
import { getNoticesRequest, useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { NoticeSort, SeoulAddress } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCookieValue } from "@/utils/getCookie";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId");

  const queryClient = new QueryClient();
  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ["getMyInfo", userId],
      queryFn: () => getMyInfo(userId),
    });
  }

  return {
    props: {
      userId: userId || null,
      dehydrateState: dehydrate(queryClient),
    },
  };
};

const JobList = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;
  const [openFilter, setOpenFilter] = useState(false);
  const page = Number(query.page) || 1;
  const sort = (query.sort as NoticeSort) || "time";
  const { page: _page, sort: _sort, ...filterConditions } = query;

  const limit = 6;
  const offset = (page - 1) * limit;
  const activePage = page;

  const keyword = Array.isArray(router.query.keyword) ? router.query.keyword[0] : router.query.keyword || "";

  const jobDataApiParams: getNoticesRequest = { offset, limit, sort, ...filterConditions };

  if (sort === "time") {
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    const startsAtGteTime = oneHourFromNow.toISOString().split(".")[0] + "Z";
    if (!jobDataApiParams.startsAtGte || jobDataApiParams.startsAtGte < startsAtGteTime) {
      jobDataApiParams.startsAtGte = startsAtGteTime;
    }
  }

  const { data: jobData, isLoading, isError } = useGetNoticesQuery(jobDataApiParams);
  const { data: userData, isLoading: isUserDataLoading } = useGetMyInfoQuery(userId ?? "", { enabled: !!userId });
  const userAddress = userData?.item?.address;
  const { data: recommendData, isLoading: isRecommendDataLoading } = useGetNoticesQuery(
    {
      offset: 0,
      limit: 3,
      sort: "pay",
      address: userAddress,
    },
    {
      enabled: !!userAddress,
    },
  );

  const hasJobData = jobData?.items && jobData.items.length > 0;
  const hasRecommendData = recommendData?.items && recommendData.items.length > 0;
  const hasUserAddress = !!userData?.item?.address;
  const isEmployer = userData?.item?.type === "employer";
  const hasKeyword = keyword?.trim() !== "";
  const recommendShow = isEmployer && hasKeyword;

  const handleFilterToggle = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleApplyFilter = (newFilters: getNoticesRequest) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== null && v !== ""),
    ) as getNoticesRequest;
    setOpenFilter(false);
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          ...cleanFilters,
          page: 1,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handlePageChange = (pageNumber: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          page: pageNumber,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleSortChange = (option: { value: string }) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          sort: option.value as NoticeSort,
          page: 1,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (isLoading) {
      const timeOut = setTimeout(() => {
        window.alert("네트워크 환경을 확인해 주세요.");
        router.push("/");
      }, 20000);
      return () => clearTimeout(timeOut);
    }
  }, [isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>공고를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {recommendShow ? null : (
        <div className="bg-red-10">
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
                  <div className="flex gap-4 overflow-x-scroll pb-60 pt-31 tablet:gap-10">
                    {recommendData?.items.map((data) => (
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
                  <div className="flex justify-center pb-100 pt-40">
                    <p className="text-14 font-bold tablet:text-20">
                      아쉽지만, 고객님 주소 주변에는 알바를 구하는 가게가 없습니다😔
                    </p>
                  </div>
                )
              ) : (
                <div className="flex justify-center pb-100 pt-40">
                  <p className="text-14 font-bold tablet:text-20">프로필 등록을 해서 주소 맞춤 공고를 확인해보세요!</p>
                </div>
              )
            ) : (
              <div className="flex justify-center pb-100 pt-40">
                <p className="text-14 font-bold tablet:text-20">
                  로그인과 프로필 등록을 해서 맞춤 공고를 확인해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {hasJobData ? (
        <div className="mx-auto mb-40 mt-60 px-12 mobile:max-w-375 tablet:max-w-678 tablet:px-0 desktop:max-w-964">
          <div className="mb-16 flex flex-col items-start justify-start gap-16 tablet:mb-40 tablet:flex-row tablet:items-center tablet:justify-between">
            {keyword && keyword.trim() !== "" ? (
              <div className="text-20 font-bold tablet:text-28">
                <h2 className="inline text-primary">{keyword}</h2>에 대한 공고 목록
              </div>
            ) : (
              <h2 className="text-20 font-bold tablet:text-28">전체 공고</h2>
            )}
            <div className="relative flex gap-10">
              <SelectBox
                options={SORT_OPTIONS}
                placeholder={SORT_OPTIONS.find((option) => option.value === sort)?.label}
                className="min-w-114 border-none bg-gray-10 px-12 py-8 text-14 font-bold"
                dropdownClassname="border-gray-10"
                onChange={handleSortChange}
              />
              <button
                className="h-40 flex-shrink-0 rounded-5 bg-red-30 px-12 py-6 text-16 font-bold text-white"
                onClick={handleFilterToggle}
              >
                상세 필터
              </button>
              {openFilter && (
                <div className="absolute right--1 top-50 z-50 tablet:right-0">
                  <Filter
                    isOpen={openFilter}
                    onClose={() => setOpenFilter(false)}
                    closeOnEsc={true}
                    className={"bg-white"}
                    onApply={handleApplyFilter}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 desktop:grid-cols-3 desktop:gap-14">
            {jobData?.items.map((data) => (
              <Link key={data.item.id} href={`/jobinfo/${data.item.shop.item.id}/${data.item.id}`}>
                <Post
                  {...data.item}
                  {...data.item.shop.item}
                  address={data.item.shop.item.address1 as SeoulAddress}
                  id={data.item.shop.item.id}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-40 pl-12 mobile:max-w-350 tablet:max-w-678 tablet:pl-0 desktop:max-w-964">
          <div className="flex justify-between">
            <h2 className="text-20 font-bold tablet:text-28">전체 공고</h2>
            <div className="relative flex gap-10">
              <SelectBox
                options={SORT_OPTIONS}
                placeholder={SORT_OPTIONS.find((option) => option.value === sort)?.label}
                className="min-w-114 border-none bg-gray-10 px-12 py-8 text-14 font-bold"
                dropdownClassname="border-gray-10"
                onChange={handleSortChange}
              />
              <button
                className="h-40 flex-shrink-0 rounded-5 bg-red-30 px-12 py-6 text-16 font-bold text-white"
                onClick={handleFilterToggle}
              >
                상세 필터
              </button>
              {openFilter && (
                <div className="absolute right--1 top-50 z-50 tablet:right-0">
                  <Filter
                    isOpen={openFilter}
                    onClose={() => setOpenFilter(false)}
                    closeOnEsc={true}
                    className={"bg-white"}
                    onApply={handleApplyFilter}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-100 flex justify-center">
            <p className="text-14 font-bold tablet:text-20">조건에 맞는 공고가 없습니다.</p>
          </div>
        </div>
      )}

      <div className="mb-80 tablet:mb-60">
        <ListPagination
          limit={limit}
          count={jobData?.count ?? 0}
          activePage={activePage}
          hasNext={jobData?.hasNext ?? false}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobList;
JobList.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
