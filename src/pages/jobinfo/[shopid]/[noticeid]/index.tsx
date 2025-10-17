import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import JobDetail from "../../_components/jobdetail";

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

  return {
    props: {
      shopId: shopid,
      noticeid: noticeid,
    },
  };
};

const JobInfo = ({ shopId, noticeid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="bg-gray-5 pt-40 desktop:pt-60">
      <div className="mx-auto min-w-375 max-w-1080 px-12 tablet:w-full tablet:px-32 desktop:w-1080">
        <JobDetail shopId={shopId} noticeId={noticeid} />
      </div>
    </div>
  );
};

export default JobInfo;

JobInfo.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
