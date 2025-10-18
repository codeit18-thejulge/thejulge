import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import EmptyProfile from "@/pages/profile/_components/Profile/EmptyProfile";
import ProfileDetail from "@/pages/profile/_components/Profile/ProfileDetail";
import Layout from "@/components/Layout";
import { ReactNode } from "react";
import { getCookieValue } from "@/utils/getCookie";
import LoadingSpinner from "@/components/LoadingSpinner";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

const Profile = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: userInfo, isError, error, isLoading } = useGetMyInfoQuery(userId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const isProfileRegistered = !!(userInfo?.item.name && userInfo.item.phone && userInfo.item.address);

  return <>{isProfileRegistered ? <ProfileDetail userId={userId} /> : <EmptyProfile />}</>;
};

Profile.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export { getServerSideProps };
export default Profile;
