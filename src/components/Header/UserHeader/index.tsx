import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";
import { UserType } from "@/types/global";
import { cn } from "@/utils";
import Notification from "@/components/Notification";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // const cookie = context.req.headers.cookie;
  // const userId = getCookieValue(cookie, "userId");
  // const shopId = getCookieValue(cookie, "shopId")??"";
  const userId = "0f393807-2d97-4798-87d7-4eb126e5afd2";
  const shopId = "f431e0c6-ace7-4d16-badc-3dcdb8dd75a8";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
  });
  return {
    props: {
      userId,
      shopId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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

const UserMenu = ({ userType, shopId }: { userType: UserType; shopId: string }) => {
  const router = useRouter();
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const handleNotiToggle = () => {
    setIsNotiOpen((prev) => !prev);
  };
  const handleNotiClose = () => {
    setIsNotiOpen(false);
  };

  // 임시로 로컬스토리지 구현
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("shopId");
    router.replace("/joblist");
  };

  return (
    <ul className="flex items-center gap-16 desktop:gap-40">
      <li>
        <Link href={`${userMenuItem.userPage[userType].href}/${shopId}`} className={cn(linkStyle)}>
          {userMenuItem.userPage[userType].title}
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className={cn(linkStyle)}>
          {userMenuItem.logout.title}
        </button>
      </li>
      <li className="tablet:relative">
        <button aria-label="알림 열기" className="flex" onClick={handleNotiToggle}>
          <IcNoti className="w-20 text-primary tablet:w-24" />
        </button>
        {isNotiOpen && (
          <Notification onClose={handleNotiClose} className="fixed right-0 top-0 tablet:absolute tablet:top-32" />
        )}
      </li>
    </ul>
  );
};

const UserHeader = ({ userId, shopId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // 임시로 localStorage 사용
  const [tempUserId, setTempUserId] = useState("");

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId") || "";
    setTempUserId(userIdFromStorage);
  }, []);

  const { data: userInfo } = useGetMyInfoQuery(tempUserId);

  // 임시로 api 조회해서 사용
  const tempShopId = userInfo?.item.shop?.item.id ?? "";

  const userType: UserType = userInfo?.item.type ?? "employee";
  const isLogined = Boolean(tempUserId);

  return (
    <nav className="order-2 ml-auto flex h-30 shrink-0 tablet:order-3 tablet:h-40">
      {isLogined ? <UserMenu userType={userType} shopId={tempShopId} /> : <GuestMenu />}
    </nav>
  );
};

export { getServerSideProps };
export default UserHeader;
