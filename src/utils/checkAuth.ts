// SSR에서 로그인 여부, 유저 타입 체크

import { GetServerSidePropsContext } from "next";
import { getCookieValue } from "./getCookie";

interface CheckAuthSSRProps {
  userId: string | null;
  userType: string | null;
  shopId: string | null;
  redirect?: { destination: string; permanent: boolean };
}

export const checkAuthSSR = (
  context: GetServerSidePropsContext,
  requiredUserType?: string,
  requireShop: boolean = false,
  redirectPath?: string,
): CheckAuthSSRProps => {
  const cookie = context.req.headers.cookie || "";
  const userId = getCookieValue(cookie, "userId") || null;
  const userType = getCookieValue(cookie, "userType") || null;
  const shopId = getCookieValue(cookie, "shopId") || null;

  // 로그인 체크
  if (!userId) {
    return { userId, userType, shopId, redirect: { destination: "/signin", permanent: false } };
  }

  // 유저 타입 체크
  if (requiredUserType && userType !== requiredUserType) {
    return {
      userId,
      userType,
      shopId,
      redirect: { destination: redirectPath || "/joblist", permanent: false },
    };
  }

  // employer일때 shopId 체크
  if (requireShop && requiredUserType === "employer" && !shopId) {
    return {
      userId,
      userType,
      shopId,
      redirect: { destination: redirectPath || "/shopinfo", permanent: false },
    };
  }

  return { userId, userType, shopId };
};
