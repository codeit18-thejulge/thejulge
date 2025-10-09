import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const formatCreatedTime = (createdAt: string) => {
  const now = dayjs();
  const created = dayjs(createdAt);

  if (now.diff(created, "day") >= 7) {
    return created.format("YYYY-MM-DD HH:mm");
  }

  return created.fromNow();
};

export const formatNoticeTime = (startsAt: string, workhour: number) => {
  const sTime = dayjs(startsAt).format("YYYY-MM-DD HH:mm");
  const eTime = dayjs(startsAt).add(workhour, "hour").format("HH:mm");
  return `${sTime}~${eTime}`;
};

// 지난 공고인지 확인하는 함수
export const isStartTimePassed = (startsAt: string): boolean => {
  const now = dayjs(); // 현재 시간
  const startTime = dayjs(startsAt); // 비교할 시작 시간

  return now.isAfter(startTime);
};
