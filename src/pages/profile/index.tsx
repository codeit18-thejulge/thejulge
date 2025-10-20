import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import Layout from "@/components/Layout";
import { ReactNode } from "react";
import { getCookieValue } from "@/utils/getCookie";
import SkeletonUI from "@/components/Skeleton";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const { data: userInfo, isPending } = useGetMyInfoQuery(userId);

  const router = useRouter();

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl px-24 py-60">
        <SkeletonUI count={1} boxClassName="h-40 w-105" />
        <SkeletonUI count={1} boxClassName="h-211 w-976 my-33" />
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  const hasProfile = !!(userInfo.item.name && userInfo.item.phone && userInfo.item.address);

  if (hasProfile) {
    router.push(`/profile/${userId}`);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-24 py-60">
      <h2 className="text-20-bold tablet:text-28-bold">내 프로필</h2>
      <section className="my-20 flex flex-col items-center justify-center gap-24 rounded-xl border border-gray-20 px-24 py-60">
        <p className="text-14-regular tablet:text-16-regular">내 프로필을 등록하고 원하는 가게에 지원해 보세요</p>
        <Link href="/profile/register">
          <Button status="filled" className="w-150 px-20 py-10 tablet:w-346">
            내 프로필 등록하기
          </Button>
        </Link>
      </section>
    </div>
  );
};

Profile.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export { getServerSideProps };
export default Profile;
