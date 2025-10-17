import { UserType } from "@/types/global";
import NormalBadge from "@/components/Badge/NormalBadge";
import { UserItem, UserInfoItem } from "@/types/global";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatNoticeTime } from "@/utils/formatTime";
import tableStyle from "@/styles/table.module.css";
import { cn } from "@/utils";

interface user {
  user: {
    item: UserItem & Partial<UserInfoItem>;
    href: string;
  };
}

// 테이블 값
interface TableRowProps {
  item: GetShopApplicationsResponse["items"][0]["item"] | GetUserApplicationsResponse["items"][0]["item"];
  userType: UserType;
  isLoading?: boolean;
  error?: boolean;
  handleApplicationClick?: (jobId: string) => void;
  onHandleRejectClick?: () => void;
  onHandleAcceptClick?: () => void;
}

const BUTTON_STYLE = "rounded-5 border px-10 py-2 text-12-regular tablet:py-5 tablet:text-14-regular hover:drop-shadow";

const TableRow = ({
  item,
  userType,
  onHandleRejectClick,
  onHandleAcceptClick,
  handleApplicationClick,
}: TableRowProps) => {
  const { shop, notice } = item;
  const { user } = item as user;
  const [isState, setIsState] = useState<"pending" | "accepted" | "rejected" | "canceled">(item.status);

  const jobId = item?.notice.item.id;

  const handleRowClick = (jobId: string) => {
    handleApplicationClick?.(jobId);
  };

  useEffect(() => {
    setIsState(item.status);
  }, [item.status]);

  if (userType === "employer") {
    // 신청자 목록 - 사장
    const phoneNumber = user.item.phone || "-";
    return (
      <tr>
        <td>{user.item.name}</td>
        <td>
          <p className={tableStyle.overText}>{user.item.bio || "-"}</p>
        </td>
        <td>{formatPhoneNumber(phoneNumber)}</td>
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
    const time = new Date(notice.item.startsAt).toLocaleDateString();
    return (
      <tr onClick={() => handleRowClick(jobId)}>
        <td>{shop.item.name}</td>
        <td>
          {formatNoticeTime(time, notice.item.workhour)} ({notice.item.workhour}시간)
        </td>
        <td>{notice ? notice.item.hourlyPay.toLocaleString() : "-"}</td>
        <td>
          <NormalBadge status={isState} />
        </td>
      </tr>
    );
  }
};

export default TableRow;
