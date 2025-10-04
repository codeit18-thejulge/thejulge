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
      <span className="text-20-bold">{hourlyPay}원</span>
      <PayBadge hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} />
    </footer>
  );
};

export default PostFooter;
