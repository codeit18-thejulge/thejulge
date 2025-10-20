import { UserType } from "@/types/global";
import NormalBadge from "@/components/Badge/NormalBadge";
import { UserItem, UserInfoItem } from "@/types/global";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { GetShopApplicationsResponse } from "@/hooks/api/application/useGetShopApplicationsQuery";
import Button from "@/components/Button";
import { ResultStatus } from "@/types/global";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatNoticeTime } from "@/utils/formatTime";
import tableStyle from "@/styles/table.module.css";
import { cn } from "@/utils";
import { useRef, useState } from "react";

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
  isState?: string;
  handleApplicationClick?: (shopId: string, jobId: string) => void;
  handleRejectClick?: (approval: ResultStatus, sendId: string) => void;
  handleAcceptClick?: (approval: ResultStatus, sendId: string) => void;
  handleVolunteerClick?: (volunteerId: string) => void;
}

const BUTTON_STYLE = "rounded-5 border px-10 py-2 text-12-regular tablet:py-5 tablet:text-14-regular hover:drop-shadow";

const TableRow = ({ item, userType, handleRejectClick, handleAcceptClick, handleApplicationClick }: TableRowProps) => {
  const { shop, notice } = item;
  const { user } = item as user;
  const [isOpen, setIsOpen] = useState(false);

  const toggleLine = useRef<HTMLTableRowElement>(null);

  const handleLineOpenClick = () => {
    const line = document.querySelectorAll<HTMLTableRowElement>("tbody tr");
    setIsOpen((prev) => !prev);
    line.forEach((item) => {
      if (!item.classList.contains("false")) {
        item.classList.remove(tableStyle.open);
      }
    });
  };

  const jobId = item?.notice.item.id;
  const shopId = item?.shop.item.id;
  const handleRowClick = (shopId: string, jobId: string) => {
    handleApplicationClick?.(shopId, jobId);
  };

  if (userType === "employer") {
    // 신청자 목록 - 사장
    return (
      <tr
        ref={toggleLine}
        onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
          e.stopPropagation();
          handleLineOpenClick();
        }}
        className={`${isOpen && tableStyle.open} ${tableStyle.employerOrder}`}
      >
        <td>{user.item.name}</td>
        <td>
          <p className={tableStyle.overText}>{user.item.bio || "-"}</p>
        </td>
        <td>{formatPhoneNumber(user.item.phone || "-")}</td>
        <td>
          {item.status === "pending" ? (
            <div className={tableStyle.btnGroup}>
              <Button
                className={cn(BUTTON_STYLE)}
                status={"lined"}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleRejectClick?.("rejected", item.id);
                }}
              >
                거절하기
              </Button>
              <Button
                className={cn("border-blue-20 text-blue-20", BUTTON_STYLE)}
                status={"lined"}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleAcceptClick?.("accepted", item.id);
                }}
              >
                승인하기
              </Button>
            </div>
          ) : (
            <NormalBadge status={item.status} />
          )}
        </td>
      </tr>
    );
  } else {
    // 가게 목록 -알바
    const time = new Date(notice.item.startsAt).toLocaleDateString();
    return (
      <tr
        onClick={(e) => {
          e.stopPropagation();
          handleRowClick(shopId, jobId);
        }}
        className={tableStyle.employeeOrder}
      >
        <td>{shop.item.name}</td>
        <td>
          {formatNoticeTime(time, notice.item.workhour)} ({notice.item.workhour}시간)
        </td>
        <td>{notice ? notice.item.hourlyPay.toLocaleString() : "-"}</td>
        <td>
          <NormalBadge status={item.status} />
        </td>
      </tr>
    );
  }
};

export default TableRow;
