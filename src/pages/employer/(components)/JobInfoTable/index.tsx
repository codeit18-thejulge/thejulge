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
  onHandleRejectClick?: () => void; // 거절 버튼 클릭 시 호출
  onHandleAcceptClick?: () => void; // 승인 버튼 클릭 시 호출
  onPageChange: (pageNumber: number) => void;
}

const JobInfoTable = ({ res, limit, count, hasNext, onPageChange }: TableProps) => {
  return (
    <>
      <div className="tableWrap">
        <div className="tableOver">
          <Table res={res} userType={"employer"} />
        </div>
        <div className="tableBottom">
          <ListPagination limit={limit} count={count} hasNext={hasNext} onPageChange={onPageChange} />
        </div>
      </div>
    </>
  );
};

export default JobInfoTable;
