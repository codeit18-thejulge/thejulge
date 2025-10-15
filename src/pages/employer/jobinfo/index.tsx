import { dehydrate, QueryClient } from "@tanstack/react-query";
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
  const SHOP_ID = "30edfcc1-16de-4af0-8464-870fc28798dd";
  const NOTICE_ID = "99c62f0c-95cf-4445-9a67-b4f7ad3480ee";

  const [modalMessage, setModalMessage] = useState("");
  const [approval, setApproval] = useState<"rejected" | "accepted" | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const { data } = useGetShopApplicationsQuery({
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

  // 페이지네이션 요청
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

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

  const mutation = usePutShopApplicationQuery();

  const handleSubmit = (status: "accepted" | "rejected") => {
    mutation.mutate({
      shopId: SHOP_ID,
      noticeId: NOTICE_ID,
      applicationId: data?.items[0].item.user.item.id || "",
      data: { status },
    });
    setIsOpen(false);
  };

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
            onPageChange={onHandlePageChange}
            onModalMessage={onModalMessage}
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
                  handleSubmit(approval);
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
