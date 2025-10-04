import IcCheckSquare from "@/assets/svgs/ic_check-square.svg";
import { formatCreatedTime, formatNoticeTime } from "@/utils/formatTime";

import { cn } from "@/utils";
import { UserAlertItem } from "@/types/api/userAlerts";

const statusColor = {
  accepted: { bg: "bg-blue-20", text: "text-blue-20" },
  rejected: { bg: "bg-primary", text: "text-primary" },
};

interface NotificationItemProps {
  alert: UserAlertItem;
  onAlertRead: (alertId: string) => void;
}

const NotificationItem = ({ alert, onAlertRead }: NotificationItemProps) => {
  const handleReadBtnClick = () => {
    onAlertRead(alert.id);
  };

  const createdTime = formatCreatedTime(alert.createdAt);
  const { startsAt, workhour } = alert.notice.item;
  const workTime = formatNoticeTime(startsAt, workhour);

  return (
    <div className="p-8 pl-0">
      <div className="flex items-center gap-10">
        <span className={cn("h-6 w-6 rounded-full", statusColor[alert.result].bg)}></span>
        <span className="text-12-regular text-gray-40">{createdTime}</span>
        <button aria-label="알림 읽음 처리하기" className="ml-auto" onClick={handleReadBtnClick}>
          <IcCheckSquare className="w-14 text-gray-40 hover:text-black"></IcCheckSquare>
        </button>
      </div>
      <div className="flex items-center gap-10">
        <span className="mx-3 h-52 w-1 bg-gray-40"></span>
        <p className="text-14-regular">
          {alert.shop.item.name}({workTime}) 공고 지원이{" "}
          <span className={cn("text-14-bold", statusColor[alert.result].text)}>
            {alert.result === "accepted" ? "승인" : "거절"}
          </span>
          되었어요.
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
