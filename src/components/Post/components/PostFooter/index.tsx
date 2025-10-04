import React from "react";

interface Props {
  hourlyPay: number;
}

const PostFooter = ({ hourlyPay }: Props) => {
  return (
    <footer className="items-center justify-between tablet:flex">
      <span className="text-20-bold">{hourlyPay}원</span>
      {/* <PayBadge /> */}
      <div className="rounded-md bg-red-400 text-white">기존 시급보다 50%</div>
    </footer>
  );
};

export default PostFooter;
