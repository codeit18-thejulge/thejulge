import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { UserType } from "@/types/global";
import { cn } from "@/utils";
import { useLogoutQuery } from "@/hooks/api/user/useLogoutQuery";
import { useEffect, useRef, useState } from "react";
import { getCookieValue } from "@/utils/getCookie";
import NotificationWrapper from "@/components/NotificationWrapper";
import { useGetUserAlertsQuery } from "@/hooks/api/alert/useGetUserAlertsQuery";

const linkStyle = "text-14-bold tablet:text-16-bold";
const navStyle = "order-2 ml-auto flex h-30 shrink-0 tablet:order-3 tablet:h-40";

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
      href: () => "/profile",
    },
    employer: {
      title: "내 가게",
      href: (shopId?: string) => (shopId ? `/shopinfo/${shopId}` : "/shopinfo"),
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

const UserHeader = () => {
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [shopId, setShopId] = useState("");
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // 알림 위치 때문에 버튼 ref로 DOM 좌표 사용
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: alertData } = useGetUserAlertsQuery({ userId, options: { enabled: !!userId } });
  const { mutateAsync: postLogout } = useLogoutQuery();

  const hasUnread = alertData?.items?.some((i) => !i.item.read) ?? false;

  const handleLogoutClick = async () => {
    await postLogout();
    setUserId("");
    setUserType(null);
    setShopId("");
  };

  const handleNotiToggle = () => {
    setIsNotiOpen((prev) => !prev);
  };
  const handleNotiClose = () => {
    setIsNotiOpen(false);
  };

  useEffect(() => {
    const id = getCookieValue(document.cookie, "userId") || "";
    const type = getCookieValue(document.cookie, "userType");
    const shop = getCookieValue(document.cookie, "shopId") || "";
    setUserId(id);
    setShopId(shop);

    if (type === "employee" || type === "employer") {
      setUserType(type);
    } else {
      setUserType(null);
    }
  }, [userId, userType, shopId]);

  if (!userId) {
    return (
      <nav className={navStyle}>
        <GuestMenu />
      </nav>
    );
  }

  return (
    <nav className={navStyle}>
      <ul className="flex items-center gap-16 desktop:gap-40">
        {userType && (
          <li>
            <Link href={userMenuItem.userPage[userType].href(shopId)} className={cn(linkStyle)}>
              {userMenuItem.userPage[userType].title}
            </Link>
          </li>
        )}
        <li>
          <button className={cn(linkStyle)} onClick={handleLogoutClick}>
            로그아웃
          </button>
        </li>
        {userType === "employee" && (
          <li className="tablet:relative">
            <button ref={btnRef} aria-label="알림 열기" className="flex" onClick={handleNotiToggle}>
              <IcNoti className={cn("w-20 tablet:w-24", hasUnread ? "text-[#00aaaa]" : "text-black")} />
            </button>
            {isNotiOpen && <NotificationWrapper onClose={handleNotiClose} btnRef={btnRef} />}
          </li>
        )}
      </ul>
    </nav>
  );
};
export default UserHeader;
