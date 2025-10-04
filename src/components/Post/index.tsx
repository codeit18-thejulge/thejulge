import { cn } from "@/utils";
import { SeoulAddress } from "@/types/api/user";
import { useRouter } from "next/router";
import PostImage from "./components/PostImage";
import PostFooter from "./components/PostFooter";
import PostInfo from "./components/PostInfo";

export interface NoticeItem {
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
  basic: "bg-white border-gray-30 border w-312 h-349 p-16 rounded-md",
  closed: "text-gray-30",
};

const Post = ({ name, id, hourlyPay, startsAt, workhour, closed, imageUrl, address }: Props) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/notice/${id}`); // 페이지 url 에 따라 추후 변경 가능
  };

  return (
    <section className={cn(postStyles.basic, closed && postStyles.closed)}>
      <button onClick={handlePostClick} className="flex h-full w-full flex-col justify-between gap-20">
        <PostImage imageUrl={imageUrl} />
        <PostInfo name={name} address={address} startsAt={startsAt} workhour={workhour} />
        <PostFooter hourlyPay={hourlyPay} />
      </button>
    </section>
  );
};

export default Post;
