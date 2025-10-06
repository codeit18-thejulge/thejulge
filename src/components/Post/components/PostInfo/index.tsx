import { getDateFromISOString } from "@/utils/getDateFromISOString";
import IcClcok from "@/assets/svgs/ic_clock.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import { cn } from "@/utils";

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
  const date = getDateFromISOString(startsAt);

  return (
    <div className="flex flex-col items-start gap-8 text-gray-50 tablet:gap-12">
      <h3 className="text-16-bold text-black tablet:text-20-bold">{name}</h3>
      <div className="flex gap-8">
        <IcClcok className={cn(icStyles.basic, closed && icStyles.closed)} />
        <div className="flex flex-col items-start text-12 tablet:flex-row tablet:gap-8 tablet:text-14">
          <span>{date}</span>
          <p>({workhour}시간)</p>
        </div>
      </div>
      <div className="flex gap-8 text-12 tablet:text-14">
        <IcAddress className={cn(icStyles.basic, closed && icStyles.closed)} />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInfo;
