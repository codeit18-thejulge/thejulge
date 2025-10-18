import ListPagination from "@/components/ListPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import Table from "@/components/Table";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { p } from "framer-motion/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  userId: string;
}

const LIMIT = 5;

const ApplicationLogSection = ({ userId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * LIMIT;

  const { data, isLoading, isError, error } = useGetUserApplicationsQuery({ userId, params: { offset, limit: LIMIT } });

  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleApplicationClick = (jobId: string) => {
    router.push(`/jobinfo/${jobId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const { items, limit, count, hasNext } = data;
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-24">
      <h2 className="flex-[1] text-20-bold tablet:text-28-bold">신청내역</h2>
      <div className="tableOver min-h-420">
        <Table userType="employee" res={items} handleApplicationClick={handleApplicationClick} />
      </div>
      <div>
        <ListPagination
          limit={limit}
          count={count}
          hasNext={hasNext}
          activePage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ApplicationLogSection;
