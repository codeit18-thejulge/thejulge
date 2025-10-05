import NormalBadge from "../Badge/NormalBadge";
import Pagination from "../Pagination";
import { useState, useEffect } from "react";
import { Notice } from "@/types/api/notice";
import tableStyle from "@/styles/table.module.css";

const TABLE_HEADER = {
  employer: ["신청자", "소개", "전화번호", "상태"],
  employee: ["가게", "일자", "시급", "상태"],
};

interface TableProps {
  userType: keyof typeof TABLE_HEADER;
  res: Notice[];
}

const Table = ({ userType, res }: TableProps) => {
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
            <col className="w-236" />
          </colgroup>
          <thead className={tableStyle.theadColor}>
            <TableHeader colTitle={headerTitles} />
          </thead>
          <tbody>
            {tableData.map((item) => (
              <TableRow key={item.id} item={item} userType={userType} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={tableStyle.tableBottom}>
        <Pagination />
      </div>
    </div>
  );
};

interface TableHeaderProps {
  colTitle: string[];
}

// 열 제목
const TableHeader = ({ colTitle }: TableHeaderProps) => {
  return (
    <tr>
      {colTitle.map((item, index) => (
        <th key={index} scope="col">
          {item}
        </th>
      ))}
    </tr>
  );
};

// 테이블 값
interface TableRowProps {
  item: Notice;
  userType: keyof typeof TABLE_HEADER;
}

const TableRow = ({ item, userType }: TableRowProps) => {
  const { user, shop, notice } = item;
  const [isState, setIsState] = useState<"pending" | "accepted" | "rejected" | "canceled">(item.status);

  useEffect(() => {
    setIsState(item.status);
  }, [item.status]); // 의존성 수정

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
              <button className="rounded-5 border border-primary px-10 py-5 text-primary">거절하기</button>
              <button className="rounded-5 border border-blue-20 px-10 py-5">승인하기</button>
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
        <td>{notice ? Number(notice.item.hourlyPay).toLocaleString() : "-"}</td>
        <td>
          <NormalBadge status={isState} />
        </td>
      </tr>
    );
  }
};

export default Table;
