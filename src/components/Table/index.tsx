import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { ResultStatus } from "@/types/global";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import tableStyle from "@/styles/table.module.css";
import Image from "next/image";
import IcNullBody from "@/assets/svgs/ic_exc.png";

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
  handleRejectClick?: (approval: ResultStatus, sendId: string) => void;
  handleAcceptClick?: (approval: ResultStatus, sendId: string) => void;
  handleVolunteerClick?: (volunteerId: string) => void;
}

const Table = ({ userType, res, handleRejectClick, handleAcceptClick, handleApplicationClick }: TableProps) => {
  const headerTitles = TABLE_HEADER[userType];

  return (
    <div className="tableOver min-h-300 tablet:min-h-420">
      <table className={tableStyle.table}>
        <colgroup className={tableStyle.colgroup}>
          <col className="w-228" />
          <col className="w-300" />
          <col className="w-200" />
          <col className="w-162 tablet:w-220 desktop:w-236" />
        </colgroup>
        <thead className={tableStyle.thead}>
          <TableHeader colTitle={headerTitles} />
        </thead>
        {res.length === 0 ? (
          <tbody>
            <tr className={tableStyle.nullLine}>
              <td colSpan={4}>
                <div className={tableStyle.null}>
                  <Image className="w-[15%] min-w-150" src={IcNullBody} alt="" />
                  <p className="text-center">
                    {userType === "employer" ? "아직 신청한 알바 지원자가 없어요." : "지원한 공고가 없어요"}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {res?.map((item) => (
              <TableRow
                key={item.item.id}
                item={item.item}
                userType={userType}
                handleApplicationClick={handleApplicationClick}
                handleRejectClick={handleRejectClick}
                handleAcceptClick={handleAcceptClick}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
