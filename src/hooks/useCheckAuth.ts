// CSR에서 로그인 여부, 유저 타입 체크

import { getCookieValue } from "@/utils/getCookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetMyInfoQuery } from "./api/user/useGetMyInfoQuery";

const useCheckAuth = (requiredUserType: string, redirectPath = "/") => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = getCookieValue(document.cookie, "userId") || "";
    setUserId(id);
  }, []);

  const { data: userInfo, isPending } = useGetMyInfoQuery(userId ?? "", { enabled: !!userId });

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace("/signin");
      return;
    }
    if (userInfo?.item?.type !== requiredUserType) {
      alert("접근 권한이 없습니다.");
      router.replace(redirectPath);
    }
  }, [isPending, redirectPath, requiredUserType, router, userId, userInfo]);
};
export default useCheckAuth;
