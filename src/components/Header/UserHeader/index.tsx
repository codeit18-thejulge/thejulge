import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { UserType } from "@/types/global";
import { cn } from "@/utils";

const USER_MENU_LABEL_MAP = {
  employee: "내 프로필",
  employer: "내 가게",
};

const linkStyle = "text-14-bold tablet:text-16-bold";

const GuestMenu = () => {
  return (
    <ul className="flex items-center gap-16 desktop:gap-40">
      <li>
        <Link href="/" className={cn(linkStyle)}>
          로그인
        </Link>
      </li>
      <li>
        <Link href="/" className={cn(linkStyle)}>
          회원가입
        </Link>
      </li>
    </ul>
  );
};

const UserMenu = ({ userType, userPage }: { userType: UserType; userPage: string }) => {
  return (
    <ul className="flex items-center gap-16 desktop:gap-40">
      <li>
        <Link href={userPage} className={cn(linkStyle)}>
          {USER_MENU_LABEL_MAP[userType]}
        </Link>
      </li>
      <li>
        <Link href="/" className={cn(linkStyle)}>
          로그아웃
        </Link>
      </li>
      <li>
        <button aria-label="알림 열기" className="flex">
          <IcNoti className="w-20 text-primary tablet:w-24" />
          {/* Notification Modal */}
        </button>
      </li>
    </ul>
  );
};

const UserHeader = () => {
  // 전역으로 관리되는 유저 정보 사용할 예정
  // (아직 어떤 구조가 될 지 몰라 대략적으로 변수로만 테스트 출력)
  const userType: UserType = "employee";
  const userPage = "/profile";
  const isLogined = true;

  return (
    <nav className="order-2 ml-auto flex h-30 shrink-0 tablet:order-3 tablet:h-40">
      {!isLogined && <GuestMenu />}
      {isLogined && <UserMenu userType={userType} userPage={userPage} />}
    </nav>
  );
};

export default UserHeader;
