import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { useState, useEffect } from "react";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import tableStyle from "@/styles/table.module.css";

const TABLE_HEADER = {
  employer: [
    { id: "one", title: "신청자" },
    { id: "two", title: "소개" },
    { id: "three", title: "전화번호" },
    { id: "four", title: "상태" },
  ],
  employee: [
    { id: "one", title: "가게" },
    { id: "two", title: "일자" },
    { id: "three", title: "시급" },
    { id: "four", title: "상태" },
  ],
};

interface TableProps {
  userType: keyof typeof TABLE_HEADER;
  res: GetShopApplicationsResponse["items"] | GetUserApplicationsResponse["items"];
  isLoading?: boolean;
  error?: boolean;
  handleApplicationClick?: (shopId: string, jobId: string) => void;
  onHandleRejectClick?: (approval: "rejected" | "accepted") => void;
  onHandleAcceptClick?: (approval: "rejected" | "accepted") => void;
  onHandleSandId?: (sandId: string) => void;
}

const Table = ({
  userType,
  res,
  onHandleRejectClick,
  onHandleAcceptClick,
  handleApplicationClick,
  onHandleSandId,
}: TableProps) => {
  const headerTitles = TABLE_HEADER[userType];
  const [tableData, setTableData] = useState<
    GetShopApplicationsResponse["items"] | GetUserApplicationsResponse["items"]
  >([]);

  useEffect(() => {
    setTableData(res);
  }, [res]);
  return (
    <div className="tableOver">
      <table className={tableStyle.table}>
        <colgroup>
          <col className="w-228" />
          <col className="w-300" />
          <col className="w-200" />
          <col className="w-162 tablet:w-220 desktop:w-236" />
        </colgroup>
        <thead className={tableStyle.theadColor}>
          <TableHeader colTitle={headerTitles} />
        </thead>
        <tbody>
          {tableData?.map((item) => (
            <TableRow
              key={item.item.id}
              item={item.item}
              userType={userType}
              handleApplicationClick={handleApplicationClick}
              onHandleRejectClick={onHandleRejectClick}
              onHandleAcceptClick={onHandleAcceptClick}
              onHandleSandId={onHandleSandId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
