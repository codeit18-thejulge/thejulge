import { useEffect, useState } from "react";
import JobInfoCard from "../(components)/JobInfoCard";
import JobInfoTable from "../(components)/JobInfoTable";
import MessageModal from "@/components/Modal/MessageModal";
import { usePutShopApplicationQuery } from "@/hooks/api/application/usePutShopApplicationQuery";
import { useGetShopApplicationsQuery } from "@/hooks/api/application/useGetShopApplicationsQuery";
import IcCheck from "@/assets/svgs/ic_check.svg";
import Layout from "@/components/Layout";
import { ReactNode } from "react";

const LIMIT = 5;

const JopInfo = () => {
  const SHOP_ID = "17957ee1-4c08-4bc2-be93-c6c682409456";
  const NOTICE_ID = "68f89e1d-de9b-4079-81f6-83dfa432aea4";

  const [modalMessage, setModalMessage] = useState("");
  const [approval, setApproval] = useState<"rejected" | "accepted" | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [sandId, setSandId] = useState("");

  const [page, setPage] = useState(1); //페이지 네이션

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

export default JopInfo;
