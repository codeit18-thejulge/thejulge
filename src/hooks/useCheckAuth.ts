// CSR에서 로그인 여부, 유저 타입 체크

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookieValue } from "@/utils/getCookie";

const useCheckAuth = (requiredUserType?: string, redirectPath?: string, requireShop: boolean = false) => {
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie;
    const userId = getCookieValue(cookie, "userId") || null;
    const userType = getCookieValue(cookie, "userType") || null;
    const shopId = getCookieValue(cookie, "shopId") || null;

    // 로그인 체크
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace("/signin");
      return;
    }

    // 유저 타입 체크
    if (requiredUserType && userType !== requiredUserType) {
      alert("접근 권한이 없습니다.");
      router.replace(redirectPath || "/joblist");
      return;
    }

    // // employer일때 shopId 체크
    if (requireShop && requiredUserType === "employer" && !shopId) {
      alert("가게 정보가 필요합니다.");
      router.replace(redirectPath || "/shopinfo");
    }
  }, [requiredUserType, requireShop, redirectPath, router]);
};

export default useCheckAuth;
