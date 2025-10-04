import { cn } from "@/utils";
import Image from "next/image";
import IcAddress from "@/assets/svgs/ic_address.svg";
import IcClock from "@/assets/svgs/ic_clock.svg";
import { SeoulAddress } from "@/types/api/user";
import { getDateFromISOString } from "@/utils/getDateFromISOString";

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

// name imageUrl, address 가게정보에서 받아옵니다.
interface Props extends NoticeItem {
  name: string;
  imageUrl: string;
  address: SeoulAddress;
}

const postStyles = {
  basic:
    "bg-white border-gray-30 border flex flex-col gap-20 w-171 h-261 tablet:w-332 tablet:h-359 desktop:w-312 desktop:h-349 p-16 rounded-md",
  closed: "text-gray-30",
};

const Post = ({ name, id, hourlyPay, startsAt, workhour, description, closed, imageUrl, address }: Props) => {
  const date = getDateFromISOString(startsAt);
  return (
    <section className={cn(postStyles.basic, closed && postStyles.closed)}>
      <div className="relative h-160">
        <Image src={imageUrl} alt="가게 이미지" fill className="rounded-lg object-cover" />
      </div>

      <div className="flex flex-col gap-12">
        <h3 className="text-18-bold">{name}</h3>
        <div className="flex gap-8">
          <IcClock />
          <p>
            {date} ({workhour}시간)
          </p>
        </div>
        <div className="flex gap-8">
          <IcAddress />
          <p>{address}</p>
        </div>
      </div>

      <footer className="items-center justify-between tablet:flex">
        <span className="text-20-bold">{hourlyPay}원</span>
        {/* <PayBadge /> */}
        <div className="rounded-md bg-red-400 text-white">기존 시급보다 50%</div>
      </footer>
    </section>
  );
};

export default Post;
