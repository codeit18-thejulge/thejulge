import { cn } from "@/utils";
import { SeoulAddress } from "@/types/global";
import { useRouter } from "next/router";
import PostImage from "./components/PostImage";
import PostFooter from "./components/PostFooter";
import PostInfo from "./components/PostInfo";
import { NoticeItem } from "@/types/global";

// name imageUrl, address, original hourlyPay 가게정보에서 받아옵니다.
interface Props extends Omit<NoticeItem, "description"> {
  name: string;
  imageUrl: string;
  address: SeoulAddress;
  originalHourlyPay: number;
}

const postStyles = {
  basic: "bg-white border-gray-20 border w-171 h-260 p-12 tablet:w-312 tablet:h-349 tablet:p-16 rounded-xl",
  closed: "text-gray-30",
};

const Post = ({ name, id, hourlyPay, startsAt, workhour, closed, imageUrl, address, originalHourlyPay }: Props) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/notice/${id}`); // 페이지 url 에 따라 추후 변경 가능
  };

  return (
    <section className={cn(postStyles.basic, closed && postStyles.closed)}>
      <button
        onClick={handlePostClick}
        className="flex h-full w-full flex-col justify-between gap-12 tablet:gap-20"
        aria-label="Notice Detail"
      >
        <PostImage startsAt={startsAt} imageUrl={imageUrl} closed={closed} />
        <PostInfo name={name} address={address} startsAt={startsAt} workhour={workhour} closed={closed} />
        <PostFooter hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} closed={closed} />
      </button>
    </section>
  );
};

export default Post;
