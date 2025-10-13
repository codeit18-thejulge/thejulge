import PayBadge from "@/components/Badge/PayBadge";
import React from "react";

interface Props {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
}

const PostFooter = ({ hourlyPay, originalHourlyPay, closed }: Props) => {
  return (
    <footer className="flex flex-col items-start justify-between tablet:flex-row tablet:items-center">
      <span className="text-18-bold tablet:text-24-bold">{hourlyPay.toLocaleString("ko-KR")}원</span>
      <PayBadge post={true} hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} />
    </footer>
  );
};

export default PostFooter;
