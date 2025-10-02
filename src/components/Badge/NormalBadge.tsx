
const STATUS = {
  pending: <div className="bg-green-10 px-10 py-6 text-green-20">대기중</div>,
  accepted: <div className="bg-blue-10 px-10 py-6 text-blue-20">승인완료</div>,
  rejected: <div className="bg-red-10 px-10 py-6 text-red-40">거절</div>,
  canceled: <div className="bg-gray-10 px-10 py-6 text-gray-50">취소</div>,
};

interface StatusProps {
  status?: keyof typeof STATUS; // status는 STATUS의 키값 중 하나
}

// normal 배지
const NormalBadge = ({ status }:StatusProps) => {
  const currentStatus = status ?? "pending";

  return (
    <div className="flex max-w-fit items-center overflow-hidden rounded-20 text-12-regular leading-none mobile:text-14-bold">
      {STATUS[currentStatus]}
    </div>
  );
};

export default NormalBadge;
