import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCookieValue } from "@/utils/getCookie";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import ProfileSection from "../_components/Profile/ProfileDetail/ProfileSection";
import SkeletonUI from "@/components/Skeleton";
import Layout from "@/components/Layout";
import ApplicationLogSection from "../_components/Profile/ProfileDetail/ApplicationLogSection";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { useState } from "react";
import { useRouter } from "next/router";
import EmptyApplicationLog from "../_components/Profile/ProfileDetail/EmptyApplicationLog";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId");
  const userType = getCookieValue(cookie, "userType");
  const queryClient = new QueryClient();

  if (!userId) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (userType !== "employee") {
    return {
      redirect: {
        destination: `/shopinfo`,
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
  });

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const LIMIT = 5;

const ProfileDetail = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * LIMIT;
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleApplicationClick = (shopId: string, jobId: string) => {
    router.push(`/jobinfo/${shopId}/${jobId}`);
  };

  const { data: userInfo, isPending: isUserInfoPending } = useGetMyInfoQuery(userId);
  const { data: userApplication, isPending: isApplicationPending } = useGetUserApplicationsQuery({
    userId,
    params: { offset, limit: LIMIT },
  });

  if (isUserInfoPending || isApplicationPending) {
    return (
      <>
        <div className="mx-auto flex max-w-5xl flex-col gap-24 px-24 py-60 desktop:flex-row">
          <SkeletonUI count={1} boxClassName="desktop:h-274 desktop:w-296 w-976 h-42" />
          <SkeletonUI count={1} boxClassName="h-274 desktop:w-656 w-976" />
        </div>
        <div className="mx-auto max-w-5xl px-24 py-50">
          <SkeletonUI count={1} boxClassName=" w-976 h-42" />
          <SkeletonUI count={1} boxClassName="mx-auto tablet:h-430 h-700 w-976 my-20" />
        </div>
      </>
    );
  }

  if (!userInfo || !userApplication) {
    return <p>데이터를 불러오는 데 실패했습니다.</p>;
  }

  const { items, limit, count, hasNext } = userApplication;

  return (
    <div>
      <ProfileSection item={userInfo.item} />
      {count === 0 ? (
        <EmptyApplicationLog />
      ) : (
        <ApplicationLogSection
          items={items}
          limit={limit}
          count={count}
          hasNext={hasNext}
          activePage={currentPage}
          onPageChange={handlePageChange}
          handleApplicationClick={handleApplicationClick}
        />
      )}
    </div>
  );
};

export default ProfileDetail;

ProfileDetail.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
