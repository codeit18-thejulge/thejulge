import { getDateFromISOString } from "@/utils/getDateFromISOString";
import IcClcok from "@/assets/svgs/ic_clock.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";

interface Props {
  name: string;
  startsAt: string;
  workhour: number;
  address: string;
}

const PostInfo = ({ name, startsAt, workhour, address }: Props) => {
  const date = getDateFromISOString(startsAt);
  return (
    <div className="flex flex-col gap-12">
      <h3 className="text-18-bold">{name}</h3>
      <div className="flex gap-8">
        <IcClcok />
        <p>
          {date} ({workhour}시간)
        </p>
      </div>
      <div className="flex gap-8">
        <IcAddress />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInfo;
