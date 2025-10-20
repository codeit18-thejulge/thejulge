// CSR에서 로그인 여부, 유저 타입 체크

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookieValue } from "@/utils/getCookie";
import { useModal } from "./useModal";

const useCheckAuth = (requiredUserType?: string, requireShop: boolean = false, redirectPath?: string) => {
  const router = useRouter();
  const { openModal } = useModal();

  useEffect(() => {
    const cookie = document.cookie;
    const userId = getCookieValue(cookie, "userId") || null;
    const userType = getCookieValue(cookie, "userType") || null;
    const shopId = getCookieValue(cookie, "shopId") || null;

    // 로그인 체크
    if (!userId) {
      router.replace("/signin");
      return;
    }

    // 유저 타입 체크
    if (requiredUserType && userType !== requiredUserType) {
      router.replace(redirectPath || "/joblist");
      return;
    }

    // employer일때 shopId 체크
    if (requireShop && requiredUserType === "employer" && !shopId) {
      router.replace(redirectPath || "/shopinfo");
      return;
    }
  }, [requiredUserType, requireShop, redirectPath, router, openModal]);
};

export default useCheckAuth;
