import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";
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
  res: Notice[];
  onHandleRejectClick?: () => void; // 거절 버튼 클릭 시 호출
  onHandleAcceptClick?: () => void; // 승인 버튼 클릭 시 호출
  onPageChange: () => void;
}

const Table = ({ userType, res, onHandleRejectClick, onHandleAcceptClick }: TableProps) => {
  const headerTitles = TABLE_HEADER[userType];
  const [tableData, setTableData] = useState<Notice[]>([]);
  useEffect(() => {
    setTableData(res);
  }, [res]);
  return (
    <div className={tableStyle.tableWrap}>
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
          {tableData.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              userType={userType}
              onHandleRejectClick={onHandleRejectClick}
              onHandleAcceptClick={onHandleAcceptClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
