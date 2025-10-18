import { cn } from "@/utils";
import { SeoulAddress } from "@/types/global";
import { useRouter } from "next/router";
import PostImage from "./components/PostImage";
import PostFooter from "./components/PostFooter";
import PostInfo from "./components/PostInfo";
import { NoticeItem } from "@/types/global";
import { isStartTimePassed } from "@/utils/formatTime";

// name imageUrl, address, original hourlyPay 가게정보에서 받아옵니다.
interface Props extends Omit<NoticeItem, "description"> {
  name: string;
  imageUrl: string;
  address: SeoulAddress;
  originalHourlyPay: number;
  className?: string;
}

const postStyles = {
  basic:
    "bg-white border-gray-20 border p-12 desktop:w-312 desktop:h-348 tablet:w-332 tablet:h-361 w-171 h-261 tablet:p-16 rounded-xl flex flex-col",
  closed: "text-gray-30",
};

const Post = ({
  name,
  id,
  hourlyPay,
  startsAt,
  workhour,
  closed,
  imageUrl,
  address,
  originalHourlyPay,
  className,
}: Props) => {
  const router = useRouter();

  const isPassed = isStartTimePassed(startsAt);
  return (
    <section className={cn(postStyles.basic, (closed || isPassed) && postStyles.closed, className)}>
      <button
        className="flex w-full flex-grow flex-col justify-between gap-12 tablet:gap-20"
        aria-label="Notice Detail"
      >
        <PostImage startsAt={startsAt} imageUrl={imageUrl} closed={closed} />
        <PostInfo
          name={name}
          address={address}
          startsAt={startsAt}
          workhour={workhour}
          isPassed={isPassed}
          closed={closed}
        />
        <PostFooter hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} isPassed={isPassed} />
      </button>
    </section>
  );
};

export default Post;
