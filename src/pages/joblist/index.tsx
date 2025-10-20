import Layout from "@/components/Layout";
import ListPagination from "@/components/ListPagination";
import Post from "@/components/Post";
import { getNoticesRequest, useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { NoticeSort, SeoulAddress } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCookieValue } from "@/utils/getCookie";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import SelectBar from "./_components/SelectBar";
import RecommendJobs from "./_components/RecommendJobs";
import SkeletonUI from "@/components/Skeleton";

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

  const handleApplyFilter = (newFilters: getNoticesRequest) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== null && v !== ""),
    ) as getNoticesRequest;
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
    return (
      <div>
        <div>
          <SkeletonUI count={1} boxClassName="h-541" />
        </div>
        <div className="mb-40 mt-60">
          <SkeletonUI
            count={2}
            boxClassName="h-30 gap-0 w-50 tablet:gap-4 tablet:h-40 tablet:w-150"
            className="mx-auto flex justify-start mobile:max-w-375 tablet:max-w-678 tablet:justify-between desktop:max-w-964"
          />
        </div>
        <div className="mx-auto mb-40 mt-60 px-12 mobile:max-w-375 tablet:max-w-678 tablet:px-0 desktop:max-w-964">
          <SkeletonUI
            count={6}
            className="grid grid-cols-2 gap-8 desktop:grid-cols-3 desktop:gap-14"
            boxClassName="h-261 w-171 flex-col rounded-xl border border-gray-20 bg-white p-12 tablet:h-361 tablet:w-332 tablet:p-16 desktop:h-348 desktop:w-312"
          />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center text-20 font-bold tablet:text-28">
          <p>공고를 불러오는 중에 오류가 발생했습니다.</p>
          <Link href={"/"} className="text-primary">
            메인페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <RecommendJobs
        userData={userData}
        isUserDataLoading={isUserDataLoading}
        recommendData={recommendData}
        isRecommendDataLoading={isRecommendDataLoading}
        keyword={keyword}
        userId={userId}
      />
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
            <SelectBar sort={sort} onSortChange={handleSortChange} onApplyFilter={handleApplyFilter} />
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
            <SelectBar sort={sort} onSortChange={handleSortChange} onApplyFilter={handleApplyFilter} />
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
