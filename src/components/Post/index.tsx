import { cn } from "@/utils";
import Image from "next/image";

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

// name과 imageUrld은 가게정보에서 받아옵니다.
interface Props extends NoticeItem {
  name: string;
  imageUrl: string;
}

const postStyles = {
  basic: "w-312 h-349 p-16 rounded-md",
  closed: "",
};

const Post = ({ name, id, hourlyPay, startsAt, workhour, description, closed, imageUrl }: Props) => {
  return (
    <section className={cn(postStyles.basic, closed && postStyles.closed)}>
      <div className="relative h-full">
        <Image src={imageUrl} alt="가게 이미지" fill style={{ objectFit: "cover" }} />
      </div>
      <h3 className="text-black">{name}</h3>
    </section>
  );
};

export default Post;
