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
      openModal(
        "confirm",
        "로그인이 필요한 서비스입니다.",
        () => {
          router.replace("/signin");
        },
        { closeOnOverlayClick: false, closeOnEsc: false },
      );
      return;
    }

    // 유저 타입 체크
    if (requiredUserType && userType !== requiredUserType) {
      openModal(
        "confirm",
        "접근 권한이 없습니다.",
        () => {
          router.replace(redirectPath || "/joblist");
        },
        {
          closeOnOverlayClick: false,
          closeOnEsc: false,
        },
      );
      return;
    }

    // employer일때 shopId 체크
    if (requireShop && requiredUserType === "employer" && !shopId) {
      openModal(
        "confirm",
        "가게 정보가 필요합니다.",
        () => {
          router.replace(redirectPath || "/shopinfo");
        },
        {
          closeOnOverlayClick: false,
          closeOnEsc: false,
        },
      );
    }
  }, [requiredUserType, requireShop, redirectPath, router, openModal]);
};

export default useCheckAuth;
