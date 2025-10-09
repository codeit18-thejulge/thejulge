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
}

const icStyles = {
  basic: "text-red-30 w-20 h-20",
  closed: "text-gray-30",
};

const PostInfo = ({ name, startsAt, workhour, address, closed }: Props) => {
  const { date, sTime, eTime } = getNoticeTime(startsAt, workhour);
  const period = `${sTime} ~ ${eTime}`;

  return (
    <div className={cn("flex flex-col items-start gap-8 text-gray-50 tablet:gap-12", closed && "text-gray-30")}>
      <h3 className={cn("text-16-bold tablet:text-20-bold", closed ? "text-gray-30" : "text-black")}>{name}</h3>
      <div className="flex gap-8 text-12 tablet:text-14">
        <IcClock className={icStyles.basic} />
        <div className="flex flex-col items-start tablet:flex-row tablet:gap-8">
          <span>{date}</span>
          <div className="flex gap-4 tablet:flex tablet:gap-8">
            <span>{period}</span>
            <span>({workhour}시간)</span>
          </div>
        </div>
      </div>
      <div className="flex gap-8 text-12 tablet:text-14">
        <IcAddress className={icStyles.basic} />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInfo;
