import { useEffect, useState } from "react";
import JobInfoCard from "../(components)/JobInfoCard";
import JobInfoTable from "../(components)/JobInfoTable";
import { useGetShopApplicationsQuery } from "@/hooks/api/application/useGetShopApplicationsQuery";

const LIMIT = 5;

const JopInfo = () => {
  const SHOP_ID = "30edfcc1-16de-4af0-8464-870fc28798dd";
  const NOTICE_ID = "99c62f0c-95cf-4445-9a67-b4f7ad3480ee";

  const [page, setPage] = useState(1);

  const { data, refetch } = useGetShopApplicationsQuery({
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

  // 페이지가 바뀔 때마다 데이터를 새로 요청
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
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
        />
      </section>
    </div>
  );
};

export default JopInfo;
