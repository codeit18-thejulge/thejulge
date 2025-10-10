import NormalBadge from "../Badge/NormalBadge";
// import ListPagination from "@/components/ListPagination";
import TableHeader from "./components/TableHeader";
import Button from "../Button";
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
  // limit: number;
  // count: number;
  // hasNext: boolean;
  res: Notice[];
  onHandleRejectClick?: () => void; // 거절 버튼 클릭 시 호출
  onHandleAcceptClick?: () => void; // 승인 버튼 클릭 시 호출
  onPageChange: () => void;
}

const Table = ({
  userType,
  res,
  // limit=0, count=0, hasNext, onPageChange,
  onHandleRejectClick,
  onHandleAcceptClick,
}: TableProps) => {
  const headerTitles = TABLE_HEADER[userType];
  const [tableData, setTableData] = useState<Notice[]>([]);
  useEffect(() => {
    setTableData(res);
  }, [res]);
  return (
    <div className={tableStyle.outBox}>
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
      <div className={tableStyle.tableBottom}>
        {/* 페이지 네이션 컴포넌트 만들어지면 오류 없습니다.
        <ListPagination
        // limit={limit} count={count} hasNext={hasNext} onPageChange={onPageChange}
        />*/}
      </div>
    </div>
  );
};

// 테이블 값
interface TableRowProps {
  item: Notice;
  userType: keyof typeof TABLE_HEADER;
  onHandleRejectClick?: () => void;
  onHandleAcceptClick?: () => void;
}

const TableRow = ({ item, userType, onHandleRejectClick, onHandleAcceptClick }: TableRowProps) => {
  const { user, shop, notice } = item;
  const [isState, setIsState] = useState<"pending" | "accepted" | "rejected" | "canceled">(item.status);

  useEffect(() => {
    setIsState(item.status);
  }, [item.status]);

  if (userType === "employer") {
    // 신청자 목록 - 사장
    return (
      <tr>
        <td>{user.item.name}</td>
        <td>
          <div className={tableStyle.overText}>{user.item.bio || user.item.description || "-"}</div>
        </td>
        <td>{user.item.phone || "-"}</td>
        <td>
          {isState === "pending" ? (
            <div className={tableStyle.btnGroup}>
              <Button
                className={
                  "rounded-5 border border-primary px-10 py-2 text-12-regular text-primary tablet:py-5 tablet:text-14-regular"
                }
                status={"lined"}
                onClick={onHandleRejectClick}
              >
                거절하기
              </Button>
              <Button
                className={
                  "rounded-5 border border-blue-20 px-10 py-2 text-12-regular text-blue-20 tablet:py-5 tablet:text-14-regular"
                }
                status={"lined"}
                onClick={onHandleAcceptClick}
              >
                승인하기
              </Button>
            </div>
          ) : (
            <NormalBadge status={isState} />
          )}
        </td>
      </tr>
    );
  } else {
    // 가게 목록 -알바
    return (
      <tr>
        <td>{shop.item.name}</td>
        <td>{notice ? new Date(notice.item.startsAt).toLocaleDateString() : "-"}</td>
        <td>{notice ? notice.item.hourlyPay.toLocaleString() : "-"}</td>
        <td>
          <NormalBadge status={isState} />
        </td>
      </tr>
    );
  }
};

export default Table;
