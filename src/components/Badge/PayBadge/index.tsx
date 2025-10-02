import { cn } from "@/utils";
import UpArrow from "@/assets/svgs/uparrow.svg";

interface PAY_PROPS {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
  label?: string;
  icon?: React.ReactNode;
}

const getHourlyPay = (hourlyPay: number, originalHourlyPay: number) => {
  if (originalHourlyPay === 0) return 0;
  return ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
};

const PayBadge = ({
  hourlyPay,
  originalHourlyPay,
  closed,
  label = "기존 시급보다",
  icon = <UpArrow className="w-full" />,
}: PAY_PROPS) => {
  //시급 차이 계산
  const payDifference = getHourlyPay(hourlyPay, originalHourlyPay);

  //공모 마감 상태에 따른 변화
  const closedStatusClass = closed
    ? `text-gray-20 tablet:bg-gray-20 tablet:text-white`
    : `text-red-40 tablet:text-white tablet:bg-red-40`;

  return (
    <div
      className={cn(
        "flex max-w-fit items-center gap-x-4 rounded-20 bg-white px-12 py-10 text-12-regular leading-none tablet:text-14-bold",
        closedStatusClass,
      )}
    >
      <span className="hidden tablet:inline-block">{label}</span>
      <span className="text-12-regular after:content-['%'] tablet:text-14-bold">{payDifference.toFixed(0)}</span>
      <div className="w-12 tablet:w-14">{icon}</div>
    </div>
  );
};

export default PayBadge;
