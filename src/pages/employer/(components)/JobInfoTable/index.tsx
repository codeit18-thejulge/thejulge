import Table from "@/components/Table";
import ListPagination from "@/components/ListPagination";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";

interface TableProps {
  res: GetShopApplicationsResponse["items"] | GetUserApplicationsResponse["items"];
  limit: number;
  count: number;
  hasNext: boolean;
  isLoading?: boolean;
  error?: boolean;
  onPageChange: (pageNumber: number) => void;
  onModalMessage: (approval: "rejected" | "accepted") => void;
}

const JobInfoTable = ({ res, limit, count, hasNext, onPageChange, onModalMessage }: TableProps) => {
  const onButtonClick = (approval: "rejected" | "accepted") => {
    onModalMessage(approval);
  };

  return (
    <>
      <div className="tableWrap">
        <Table
          res={res}
          userType={"employer"}
          onHandleAcceptClick={onButtonClick}
          onHandleRejectClick={onButtonClick}
        />
        <div className="tableBottom">
          <ListPagination limit={limit} count={count} hasNext={hasNext} onPageChange={onPageChange} />
        </div>
      </div>
    </>
  );
};

export default JobInfoTable;
