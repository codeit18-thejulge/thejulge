import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { cn } from "@/utils";

interface UserHeaderProps {
  userInfo?: string;
}

const UserHeader = ({ userInfo }: UserHeaderProps) => {
  return (
    <nav className={cn("h-30 tablet:h-40 ml-auto flex shrink-0 order-2 tablet:order-3")}>
      {/* 사장-로그인 */}
      <ul className={cn("flex items-center gap-16 desktop:gap-40")}>
        <li>
          <Link href="" className={cn("text-14-bold tablet:text-16-bold")}>
            내 가게
          </Link>
        </li>
        <li>
          <Link href="" className={cn("text-14-bold tablet:text-16-bold")}>
            로그아웃
          </Link>
        </li>
        <li>
          <button aria-label="알림 열기" className="flex">
            <IcNoti className={cn("w-20 tablet:w-24 text-primary")} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserHeader;
