import IcClose from "@/assets/svgs/ic_close.svg";
import NotificationItem from "./NotificationItem";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { GetUserAlertsResponse, useGetUserAlertsQuery } from "@/hooks/api/alert/useGetUserAlertsQuery";
import { usePutUserAlertsQuery } from "@/hooks/api/alert/usePutUserAlertsQuery";
import { getCookieValue } from "@/utils/getCookie";
import { useQueryClient } from "@tanstack/react-query";
import SkeletonUI from "../Skeleton";

export type UserAlertItem = GetUserAlertsResponse["items"][number]["item"];

interface NotificationProps {
  onClose: () => void;
  className?: string;
}
const Notification = ({ onClose, className }: NotificationProps) => {
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState("");
  const [alerts, setAlerts] = useState<UserAlertItem[]>([]);
  const [isAllRead, setIsAllRead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: alertData, refetch } = useGetUserAlertsQuery({ userId, options: { enabled: !!userId } });
  const { mutateAsync: putUserAlerts } = usePutUserAlertsQuery();

  const handleAlertRead = async (alertId: string) => {
    const prevAlerts = [...alerts];
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));

    putUserAlerts(
      { userId, alertId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getUserAlerts", userId] });
        },
        onError: () => {
          setAlerts(prevAlerts);
        },
      },
    );
  };
  useEffect(() => {
    setIsAllRead(!isLoading && alerts.length === 0);
  }, [alerts.length, isLoading]);
  useEffect(() => {
    const userCookieId = getCookieValue(document.cookie, "userId") || "";
    setUserId(userCookieId);
  }, []);

  useEffect(() => {
    if (userId) {
      refetch().then(() => {
        const unreadAlerts = alertData?.items?.map((i) => i.item).filter((alert) => !alert.read) ?? [];
        setAlerts(unreadAlerts);
        setIsLoading(false);
      });
    }
  }, [userId, refetch, alertData]);

  if (isLoading) {
    return (
      <section
        className={cn(
          "flex h-full w-full flex-col gap-16 bg-white px-20 py-40 tablet:h-400 tablet:w-368 tablet:rounded-10 tablet:border tablet:border-gray-30 tablet:py-24 tablet:shadow-[0_2px_8px_var(--gray-30)]",
          className,
        )}
      >
        <header>
          <h1 className="text-20-bold">알림</h1>
        </header>

        <SkeletonUI count={1} boxClassName="h-24 w-240 rounded-md" />
        <SkeletonUI count={1} boxClassName="w-full h-80 rounded-lg" />
        <SkeletonUI count={1} boxClassName="w-full h-80 rounded-lg" />
      </section>
    );
  }

  return (
    <section
      aria-label="알림"
      className={cn(
        "flex h-full w-full flex-col gap-16 bg-white px-20 py-40 tablet:h-400 tablet:w-368 tablet:rounded-10 tablet:border tablet:border-gray-30 tablet:py-24 tablet:shadow-[0_2px_8px_var(--gray-30)]",
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
        {isAllRead && <>모든 알림을 확인했어요</>}
        {!isAllRead && (
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
