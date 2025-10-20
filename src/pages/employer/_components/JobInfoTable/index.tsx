import Table from "@/components/Table";
import ListPagination from "@/components/ListPagination";
import { ResultStatus } from "@/types/global";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import SkeletonUI from "@/components/Skeleton";

interface TableProps {
  res: GetShopApplicationsResponse["items"] | GetUserApplicationsResponse["items"];
  limit: number;
  count: number;
  hasNext: boolean;
  isLoading?: boolean;
  error?: boolean;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
  onModalMessage: (approval: ResultStatus, sendId: string) => void;
}

const JobInfoTable = ({
  res,
  limit,
  count,
  hasNext,
  isLoading,
  activePage,
  onPageChange,
  onModalMessage, //상위로 승인.거절값 전달
}: TableProps) => {
  const onButtonClick = (approval: ResultStatus, sendId: string) => {
    onModalMessage(approval, sendId);
  };

  if (isLoading) {
    return (
      <div>
        <SkeletonUI count={1} boxClassName="w-full h-345 tablet:h-420" className="h-345 tablet:h-420" />
      </div>
    );
  }

  return (
    <>
      <div className="tableWrap">
        <Table res={res} userType={"employer"} handleAcceptClick={onButtonClick} handleRejectClick={onButtonClick} />
        {count > 0 && (
          <div className="tableBottom">
            <ListPagination
              limit={limit}
              count={count}
              hasNext={hasNext}
              activePage={activePage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default JobInfoTable;
