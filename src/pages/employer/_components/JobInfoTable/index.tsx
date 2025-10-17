import Table from "@/components/Table";
import ListPagination from "@/components/ListPagination";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TableProps {
  res: GetShopApplicationsResponse["items"] | GetUserApplicationsResponse["items"];
  limit: number;
  count: number;
  hasNext: boolean;
  isLoading?: boolean;
  error?: boolean;
  activePage: number; 
  onPageChange: (pageNumber: number) => void;
  onModalMessage: (approval: "rejected" | "accepted") => void;
  onHandleSandId?: (sandId: string) => void;
}

const JobInfoTable = ({
  res,
  limit,
  count,
  hasNext,
  isLoading,
  activePage,
  onPageChange,
  onModalMessage,
  onHandleSandId,
}: TableProps) => {
  const onButtonClick = (approval: "rejected" | "accepted") => {
    onModalMessage(approval);
  };

  return (
    <>
      <div className="tableWrap">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table           
            res={res}
            userType={"employer"}
            onHandleAcceptClick={onButtonClick}
            onHandleRejectClick={onButtonClick}
            onHandleSandId={onHandleSandId}
           />
        )}
        <div className="tableBottom">
          <ListPagination
            limit={limit}
            count={count}
            hasNext={hasNext}
            activePage={activePage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default JobInfoTable;
