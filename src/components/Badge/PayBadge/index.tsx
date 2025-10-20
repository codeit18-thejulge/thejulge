import { cn } from "@/utils";
import IcUpArrow from "@/assets/svgs/ic_uparrow.svg";

interface PAY_PROPS {
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
  label?: string;
  icon?: React.ReactNode;
  post?: boolean;
}

const getHourlyPay = (hourlyPay: number, originalHourlyPay: number) => {
  if (originalHourlyPay === 0) {
    return 0;
  }
  return ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
};

const PayBadge = ({
  hourlyPay,
  originalHourlyPay,
  closed,
  label = "기존 시급보다",
  icon = <IcUpArrow className="w-full" />,
  post,
  ...props
}: PAY_PROPS) => {
  //시급 차이 계산
  const payDifference = getHourlyPay(hourlyPay, originalHourlyPay);
  //시급 차이에 따른 opacity
  const opacityLevel = () => {
    if (payDifference > 50) {
      return "#FF4040";
    } else if (payDifference < 50 && payDifference > 29) {
      return "#ff8d72";
    } else if (payDifference < 30 && payDifference > 0) {
      return "#FFAF9B";
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative flex max-w-fit items-center text-12-regular leading-none tablet:text-14-bold",
          post && closed ? "text-gray-10" : "text-red-40 tablet:text-white",
          !post && !closed && "text-white tablet:text-white",
          !post && closed && "hidden",
        )}
        {...props}
      >
        <div className={cn(payDifference > 1 ? "visible" : "invisible")}>
          <div
            className={cn(
              "absolute h-full w-full rounded-20",
              post && !closed && "hidden tablet:block",
              post && closed && "hidden tablet:block tablet:bg-gray-20",
              !post && !closed && "bg-red-40",
            )}
            style={{ backgroundColor: closed ? "#e5e4e7" : opacityLevel() }}
          ></div>
          <div
            className={cn(
              "relative z-10 flex max-w-fit gap-x-4",
              post ? "px-0 py-0 tablet:px-12 tablet:py-10" : "px-12 py-10",
              !post && closed && "hidden",
              post && closed && "text-gray-30 tablet:text-white",
            )}
          >
            <span className={"inline-block"}>{label}</span>
            <span className="text-12-regular after:content-['%'] tablet:text-14-bold">{payDifference.toFixed(0)}</span>
            <div className="w-12 tablet:w-14">{icon}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayBadge;
