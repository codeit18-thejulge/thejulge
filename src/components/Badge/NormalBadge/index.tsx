import { cn } from "@/utils";
const badgeBox = `px-10 py-7 tablet:py-8`;
const STATUS = {
  pending: <div className={cn("bg-green-10 text-green-50", badgeBox)}>대기중</div>,
  accepted: <div className={cn("bg-blue-10 text-blue-20", badgeBox)}>승인완료</div>,
  rejected: <div className={cn("bg-red-10 text-red-40", badgeBox)}>거절</div>,
  canceled: <div className={cn("bg-gray-10 text-gray-50", badgeBox)}>취소</div>,
};

interface StatusProps {
  status: keyof typeof STATUS; // status는 STATUS의 키값 중 하나임
}

// normal 배지
const NormalBadge = ({ status }: StatusProps) => {
  const currentStatus = status;

  return (
    <div className="flex max-w-fit items-center overflow-hidden rounded-20 text-12-regular leading-none tablet:text-14-bold">
      {STATUS[currentStatus]}
    </div>
  );
};

export default NormalBadge;
