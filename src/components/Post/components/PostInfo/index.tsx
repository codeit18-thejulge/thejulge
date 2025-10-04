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
  basic: "text-[#FF8D72]",
  closed: "text-gray-30",
};

const PostInfo = ({ name, startsAt, workhour, address, closed }: Props) => {
  const date = getDateFromISOString(startsAt);

  return (
    <div className="flex flex-col items-start gap-12">
      <h3 className="text-18-bold">{name}</h3>
      <div className="flex gap-8">
        <IcClcok className={cn(icStyles.basic, closed && icStyles.closed)} />
        <p>
          {date} ({workhour}시간)
        </p>
      </div>
      <div className="flex gap-8">
        <IcAddress className={cn(icStyles.basic, closed && icStyles.closed)} />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInfo;
