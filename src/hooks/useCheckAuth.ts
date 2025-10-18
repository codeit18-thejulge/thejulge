// CSR에서 로그인 여부, 유저 타입 체크

import { getCookieValue } from "@/utils/getCookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useCheckAuth = (requiredUserType: string, redirectPath = "/") => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const id = getCookieValue(document.cookie, "userId") || "";
    const type = getCookieValue(document.cookie, "userType") || "";
    setUserId(id);
    setUserType(type);
  }, []);

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace("/signin");
      return;
    }
    if (userType !== requiredUserType) {
      alert("접근 권한이 없습니다.");
      router.replace(redirectPath);
    }
  }, [redirectPath, requiredUserType, router, userId, userType]);
};
export default useCheckAuth;
