import IcClock from "@/assets/svgs/ic_clock.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import { cn } from "@/utils";
import { getNoticeTime } from "@/utils/formatTime";

interface Props {
  name: string;
  startsAt: string;
  workhour: number;
  address: string;
  closed: boolean;
  isPassed: boolean;
}

const icStyles = {
  basic: "text-primary w-20 h-20",
  closed: "text-gray-30",
};

const PostInfo = ({ name, startsAt, workhour, address, closed, isPassed }: Props) => {
  const { date, sTime, eTime } = getNoticeTime(startsAt, workhour);
  const period = `${sTime} ~ ${eTime}`;

  const isGray = closed || isPassed;

  return (
    <div className={cn("flex flex-col items-start gap-8 tablet:gap-12", isGray && icStyles.closed)}>
      <h3 className={cn("text-16-bold tablet:text-20-bold", isGray ? icStyles.closed : "text-black")}>{name}</h3>

      <div className="flex gap-8 text-12 tablet:text-14">
        <IcClock className={cn(icStyles.basic, isGray && icStyles.closed)} />
        <div className="flex flex-col items-start tablet:flex-row tablet:gap-8">
          <span>{date}</span>
          <div className="flex gap-4 tablet:flex tablet:gap-8">
            <span>{period}</span>
            <span>({workhour}시간)</span>
          </div>
        </div>
      </div>

      <div className="flex gap-8 text-12 tablet:text-14">
        <IcAddress className={cn(icStyles.basic, isGray && icStyles.closed)} />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInfo;
