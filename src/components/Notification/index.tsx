import IcClose from "@/assets/svgs/ic_close.svg";
import NotificationItem from "./NotificationItem";
import LoadingSpinner from "../LoadingSpinner";

import { GetUserAlertsRequest, GetUserAlertsResponse, UserAlertItem } from "./userAlerts";
import { USER_ALERTS } from "./mockData";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

interface NotificationProps {
  userId: string;
  onClose: () => void;
  className?: string;
}

const Notification = ({ userId, onClose, className }: NotificationProps) => {
  const [alerts, setAlerts] = useState<UserAlertItem[]>([]);
  const [isLoading, setisLoading] = useState(true);

  const isAllRead = !isLoading && alerts.length === 0;
  const isUnread = !isLoading && alerts.length > 0;

  const getAlerts = async () => {
    try {
      // GET /users/{user_id}/alerts

      const data = USER_ALERTS; // 임시 mockData 사용
      const unreadAlerts = data.items.map((i) => i.item).filter((alert) => !alert.read); // 읽지 않은 알림만 필터링
      setAlerts(unreadAlerts);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  };

  const handleAlertRead = async (alertId: string) => {
    try {
      // PUT /users/{user_id}/alerts/{alert_id}

      await getAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAlerts();
  }, []);

  return (
    <section
      aria-label="알림"
      className={cn(
        "flex h-dvh w-dvw flex-col gap-16 bg-white px-20 py-40 tablet:max-h-400 tablet:w-368 tablet:rounded-10 tablet:border tablet:border-gray-30 tablet:py-24 tablet:shadow-[0_2px_8px_var(--gray-30)]",
        className,
      )}
    >
      <header>
        <h1 className="text-20-bold">알림</h1>
        <button aria-label="알림창 닫기" className={"absolute right-20 top-44 tablet:hidden"} onClick={onClose}>
          <IcClose className="w-24 text-black"></IcClose>
        </button>
      </header>

      <h2 className="text-16-regular text-gray-50">
        {isLoading && <>Loading...</>}
        {isAllRead && <>모든 알림을 확인했어요</>}
        {isUnread && (
          <>
            <span className="text-16-bold text-black">{alerts.length}</span>개의 읽지 않은 알림이 있어요
          </>
        )}
      </h2>

      <ul className="h-full overflow-y-auto">
        {isLoading && <LoadingSpinner />}
        {alerts.map((alert) => (
          <li key={alert.id}>
            <NotificationItem alert={alert} onAlertRead={handleAlertRead} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notification;
