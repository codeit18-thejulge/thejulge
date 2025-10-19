import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getShopNoticeDetail, useGetShopNoticeDetailQuery } from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import JobDetail from "../../_components/jobdetail";
import RecentList from "../../_components/recentlist";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { shopid, noticeid } = context.params as {
    shopid: string;
    noticeid: string;
  };

  if (!shopid || !noticeid) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getShopNoticeDetail", shopid, noticeid],
    queryFn: () => getShopNoticeDetail({ shopId: shopid, noticeId: noticeid }),
  });

  return {
    props: {
      shopId: shopid,
      noticeId: noticeid,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const JobInfo = ({ shopId, noticeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: jobData, isPending } = useGetShopNoticeDetailQuery({ shopId, noticeId });
  return (
    <div className="bg-gray-5">
      <div className="mx-auto flex max-w-375 flex-col tablet:max-w-680 desktop:max-w-964">
        <JobDetail shopId={shopId} noticeId={noticeId} jobData={jobData} isPending={isPending} />
        <RecentList />
      </div>
    </div>
  );
};

export default JobInfo;

JobInfo.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
