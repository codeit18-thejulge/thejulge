import clsx from "clsx";
import { cn } from "@/utils";
import UpArrow from "@/assets/svgs/uparrow.svg";

interface PAY_PROPS {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
}

// 오른쪽 아이콘 배지
const IconBadge = ({ hourlyPay, originalHourlyPay, closed }:PAY_PROPS) => {
  const calculation = () => {
    return ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  };

  const className = cn(
    "flex items-center gap-x-4 bg-white p-12  text-red-40 mobile:bg-red-40  mobile:text-white",
  );

  return (
    <div className={`max-w-fit rounded-20 leading-none text-12-regular mobile:text-14-bold ${className}`}>
      {!closed && <span>기존 시급보다</span>}
      <span className="after:content-['%']">{calculation().toFixed(0)}</span>
      <div className="w-12 mobile:w-14">
        <UpArrow className="w-full" />
      </div>
    </div>
  );
};

export default IconBadge;
