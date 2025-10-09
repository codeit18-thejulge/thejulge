import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import EmptyProfile from "@/components/Profile/EmptyProfile";
import ProfileDetail from "@/components/Profile/ProfileDetail";
import ApplicationLog from "@/components/Profile/ApplicationLog";

const getServerSideProps: GetServerSideProps = async () => {
  const userId = "906ccb00-4e5c-4340-a737-38741bde10a4";
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

  const isProfileRegistered = !!(
    userInfo?.item.name &&
    userInfo.item.phone &&
    userInfo.item.address &&
    userInfo.item.bio
  );

  return (
    <>
      {isProfileRegistered ? (
        <div>
          <ProfileDetail />
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
