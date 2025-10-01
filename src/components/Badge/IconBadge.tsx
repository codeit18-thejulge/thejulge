import clsx from "clsx";
import UpArrow from "@/assets/svgs/uparrow.svg";

interface PAY_PROPS {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
}

// 오른쪽 아이콘 배지
const IconBadge: React.FC<PAY_PROPS> = ({ hourlyPay, originalHourlyPay, closed }) => {
  const calculation = () => {
    return ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  };

  const className = clsx(
    `flex items-center gap-x-4 bg-white p-12 text-12-regular text-red-40 mobile:bg-red-40 mobile:text-14-bold mobile:text-white`,
  );

  return (
    <div className={`max-w-fit rounded-20 leading-none ${className}`}>
      {!closed && <span>기존 시급보다</span>}
      <span className="after:content-['%']">{calculation().toFixed(0)}</span>
      <div className="w-14 mobile:w-12">
        <UpArrow className="w-full" />
      </div>
    </div>
  );
};

export default IconBadge;
