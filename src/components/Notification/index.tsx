import IcClose from "@/assets/svgs/ic_close.svg";
import { cn } from "@/utils";
import NotificationItem from "./NotificationItem";

import { GetUserAlertsRequest, GetUserAlertsResponse, UserAlertItem } from "@/types/api/userAlerts";
import { USER_ALERTS } from "@/utils/mockData";
import { useEffect, useState } from "react";

interface NotificationProps {
  userId: string;
  onClose: () => void;
}

const Notification = ({ userId, onClose }: NotificationProps) => {
  const [alerts, setAlerts] = useState<UserAlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const getAlerts = async () => {
    try {
      // GET /users/{user_id}/alerts

      const data = USER_ALERTS; // 임시 mockData 사용
      const unreadAlerts = data.items.map((i) => i.item).filter((alert) => !alert.read); // 읽지 않은 알림만 필터링
      setAlerts(unreadAlerts); // MockData에 Link가 없어서 오류남
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertRead = async (alertId: string) => {
    try {
      // PUT /users/{user_id}/alerts/{alert_id}

      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAlerts();
  }, [userId, refreshFlag]);

  if (loading) {
    return <div>{"loading..."}</div>;
  }

  return (
    <div className="relative flex h-dvh w-full flex-col gap-16 px-20 py-40 tablet:max-h-400 tablet:w-368 tablet:rounded-10 tablet:border tablet:border-gray-30 tablet:py-24 tablet:shadow-[0_2px_8px_var(--gray-30)]">
      <button aria-label="알림창 닫기" className={cn("absolute right-20 top-44 tablet:hidden")} onClick={onClose}>
        <IcClose className="w-24 text-black"></IcClose>
      </button>
      <h1 className="text-20-bold">알림</h1>

      {alerts.length ? (
        <h2 className="text-16-regualr text-gray-50">
          <span className="text-16-bold text-black">{alerts.length}</span>개의 읽지 않은 알림이 있어요.
        </h2>
      ) : (
        <h2>모든 알림을 확인했습니다</h2>
      )}

      <div className="w-full overflow-y-auto">
        {alerts.map((alert) => (
          <NotificationItem key={alert.id} alert={alert} onAlertRead={handleAlertRead} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
