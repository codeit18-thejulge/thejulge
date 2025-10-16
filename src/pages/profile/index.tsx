import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import EmptyProfile from "@/pages/profile/(components)/Profile/EmptyProfile";
import ProfileDetail from "@/pages/profile/(components)/Profile/ProfileDetail";

const getServerSideProps = async () => {
  const userId = "d931b357-2c45-4ba7-a3b4-1b09e6b53484";
  const queryClient = new QueryClient();

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
  const { data: userInfo, isError, error } = useGetMyInfoQuery(userId);

  if (isError) {
    return <p>{error.message}</p>;
  }

  const isProfileRegistered = !!(userInfo?.item.name && userInfo.item.phone && userInfo.item.address);

  return <>{isProfileRegistered ? <ProfileDetail userId={userId} /> : <EmptyProfile />}</>;
};

export { getServerSideProps };
export default Profile;
