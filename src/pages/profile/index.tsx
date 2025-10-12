import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import EmptyProfile from "@/pages/profile/(components)/Profile/EmptyProfile";
import ProfileDetail from "@/pages/profile/(components)/Profile/ProfileDetail";
import ApplicationLog from "@/pages/profile/(components)/Profile/ApplicationLog";

const getServerSideProps = async () => {
  const userId = "2c2bc013-9f37-4777-9817-4b92ebaf7c0b";
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

  return (
    <>
      {isProfileRegistered ? (
        <div>
          <ProfileDetail userInfo={userInfo} />
          <ApplicationLog />
        </div>
      ) : (
        <EmptyProfile />
      )}
    </>
  );
};

export { getServerSideProps };
export default Profile;
