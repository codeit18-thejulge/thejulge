import { UserType } from "@/types/global";
import NormalBadge from "@/components/Badge/NormalBadge";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";
import tableStyle from "@/styles/table.module.css";
import { cn } from "@/utils";

// 테이블 값
interface TableRowProps {
  item: Notice;
  userType: UserType;
  onHandleOpenClick?: () => void;
  onHandleRejectClick?: () => void;
  onHandleAcceptClick?: () => void;
}

const BUTTON_STYLE = "rounded-5 border px-10 py-2 text-12-regular tablet:py-5 tablet:text-14-regular hover:drop-shadow";

const TableRow = ({ item, userType, onHandleRejectClick, onHandleAcceptClick, onHandleOpenClick }: TableRowProps) => {
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
          <p onClick={onHandleOpenClick} className={tableStyle.overText}>
            {user.item.bio || "-"}
          </p>
        </td>
        <td>{user.item.phone || "-"}</td>
        <td>
          {isState === "pending" ? (
            <div className={tableStyle.btnGroup}>
              <Button
                className={cn("border-primary text-primary", BUTTON_STYLE)}
                status={"lined"}
                onClick={onHandleRejectClick}
              >
                거절하기
              </Button>
              <Button
                className={cn("border-blue-20 text-blue-20", BUTTON_STYLE)}
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

export default TableRow;
