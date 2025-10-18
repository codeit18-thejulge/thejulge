import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { UserType } from "@/types/global";
import { cn } from "@/utils";
import { useLogoutQuery } from "@/hooks/api/user/useLogoutQuery";
import { useEffect, useState } from "react";
import { getCookieValue } from "@/utils/getCookie";
import NotificationWrapper from "@/components/NotificationWrapper";
import Notification from "@/components/Notification";

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

  const { mutateAsync: postLogout } = useLogoutQuery();

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
  }, []);

  if (!userId) {
    return <GuestMenu />;
  }

  return (
    <nav className="order-2 ml-auto flex h-30 shrink-0 tablet:order-3 tablet:h-40">
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
        <li className="tablet:relative">
          <button aria-label="알림 열기" className="flex" onClick={handleNotiToggle}>
            <IcNoti className="w-20 text-primary tablet:w-24" />
          </button>
          {isNotiOpen && <NotificationWrapper onClose={handleNotiClose} />}
        </li>
      </ul>
    </nav>
  );
};
export default UserHeader;
