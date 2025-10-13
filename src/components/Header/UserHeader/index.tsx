import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { UserType } from "@/types/global";
import { cn } from "@/utils";

const linkStyle = "text-14-bold tablet:text-16-bold";

const guestMenuItem = {
  signin: {
    title: "로그인",
    href: "/signin",
  },
  signup: {
    title: "회원가입",
    href: "/signup",
  },
};
const userMenuItem = {
  userPage: {
    employee: {
      title: "내 프로필",
      href: "/profile",
    },
    employer: {
      title: "내 가게",
      href: "/shopinfo",
    },
  },
  logout: {
    title: "로그아웃",
    href: "/joblist",
  },
};

const GuestMenu = () => {
  return (
    <ul className="flex items-center gap-16 desktop:gap-40">
      <li>
        <Link href={guestMenuItem.signin.href} className={cn(linkStyle)}>
          {guestMenuItem.signin.title}
        </Link>
      </li>
      <li>
        <Link href={guestMenuItem.signup.href} className={cn(linkStyle)}>
          {guestMenuItem.signup.title}
        </Link>
      </li>
    </ul>
  );
};

const UserMenu = ({ userType }: { userType: UserType }) => {
  return (
    <ul className="flex items-center gap-16 desktop:gap-40">
      <li>
        <Link href={userMenuItem.userPage[userType].href} className={cn(linkStyle)}>
          {userMenuItem.userPage[userType].title}
        </Link>
      </li>
      <li>
        <Link href={userMenuItem.logout.href} className={cn(linkStyle)}>
          {userMenuItem.logout.title}
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
  const isLogined = true;

  return (
    <nav className="order-2 ml-auto flex h-30 shrink-0 tablet:order-3 tablet:h-40">
      {isLogined ? <UserMenu userType={userType} /> : <GuestMenu />}
    </nav>
  );
};

export default UserHeader;
