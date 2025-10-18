import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import JobInfoCard from "../../_components/JobInfoCard";
import JobInfoTable from "../../_components/JobInfoTable";
import MessageModal from "@/components/Modal/MessageModal";
import { usePutShopApplicationQuery } from "@/hooks/api/application/usePutShopApplicationQuery";
import { useGetShopApplicationsQuery } from "@/hooks/api/application/useGetShopApplicationsQuery";
import IcCheck from "@/assets/svgs/ic_check.svg";
import Image from "next/image";
import IcNullBody from "@/assets/svgs/ic_exc.png";
import { GetServerSidePropsContext } from "next";
import { getCookieValue } from "@/utils/getCookie";
import Layout from "@/components/Layout";
import { ReactNode } from "react";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId") || "";
  const shopId = getCookieValue(cookie, "shopId") || "";
  const noticeId = context.params?.notice_id as string;

  if (!userId) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      shopId,
      noticeId,
    },
  };
};

const LIMIT = 5;

const JopInfo = ({ shopId, noticeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const NOTICE_ID = noticeId;
  const SHOP_ID = shopId as string;

  const [modalMessage, setModalMessage] = useState("");
  const [approval, setApproval] = useState<"rejected" | "accepted" | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [sandId, setSandId] = useState("");

  const [page, setPage] = useState(1); //페이지네이션

  const { data, isLoading, isError, error, refetch } = useGetShopApplicationsQuery({
    shopId: SHOP_ID,
    noticeId: NOTICE_ID,
    params: {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });

  const res = data?.items ?? [];
  const totalCount = data?.count ?? 0; // 전체 항목 수
  const hasNextPage = data?.hasNext ?? false; // 다음 페이지 여부

  const onHandlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const onModalMessage = (approval: "rejected" | "accepted") => {
    setApproval(approval);
    setIsOpen(true);
    if (approval === "rejected") {
      setModalMessage("신청을 거절하시겠어요?");
    } else if (approval === "accepted") {
      setModalMessage("신청을 승인하시겠어요?");
    }
  };

  //===승인 거절
  const mutation = usePutShopApplicationQuery();
  const handleSubmit = (sandId: string, status: "accepted" | "rejected") => {
    mutation.mutate(
      {
        shopId: data?.items[0].item.shop.item.id || "",
        noticeId: data?.items[0].item.notice.item.id || "",
        applicationId: sandId || "",
        data: { status },
      },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error("실패했어요:", error);
        },
      },
    );
    setIsOpen(false);
  };

  const onHandleSandId = (sandId: string) => {
    setSandId(sandId);
  };

  //승인 요청 보낼 아이디
  useEffect(() => {
    setSandId(sandId);
  }, [sandId]);

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="px-12 tablet:px-32">
        {!isLoading && res.length === 0 ? (
          <div className="flex h-screen flex-col items-center justify-center gap-y-20">
            <div className="w-1/2 max-w-200">
              <Image src={IcNullBody} alt="" />
            </div>
            <p>아직 신청한 알바 직원이 없어요.</p>
          </div>
        ) : (
          <>
            <section className="mx-auto py-40 tablet:py-60 desktop:max-w-964">
              <JobInfoCard res={res} bgColor={"bg-white"} />
            </section>
            <section className="mx-auto py-40 tablet:py-60 desktop:max-w-964">
              <h2 className="mb-32 text-20-bold tablet:text-28-bold">신청자 목록</h2>
              <JobInfoTable
                res={res}
                limit={LIMIT}
                count={totalCount}
                hasNext={hasNextPage}
                activePage={page}
                isLoading={isLoading}
                error={isError}
                onPageChange={onHandlePageChange}
                onModalMessage={onModalMessage}
                onHandleSandId={onHandleSandId}
              />
            </section>
          </>
        )}
      </div>

      {isOpen && (
        <MessageModal
          isOpen={isOpen}
          icon={<IcCheck />}
          message={modalMessage}
          onClose={handleClose}
          footers={[
            {
              buttonText: "아니요",
              onClick: () => handleClose(),
              style: "lined",
              className: "w-80 h-38",
            },
            {
              buttonText: "예",
              onClick: () => {
                if (approval === "rejected" || approval === "accepted") {
                  handleSubmit(sandId, approval);
                }
              },
              style: "filled",
              className: "w-80 h-38",
            },
          ]}
        ></MessageModal>
      )}
    </>
  );
};

JopInfo.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export { getServerSideProps };
export default JopInfo;
