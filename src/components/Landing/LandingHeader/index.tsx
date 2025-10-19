import Logo from "@/assets/svgs/logo-md.svg";
import Button from "@/components/Button";
import { useLogoutQuery } from "@/hooks/api/user/useLogoutQuery";
import { getCookieValue } from "@/utils/getCookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const LandingHeader = () => {
  const [isLogined, setIsLogined] = useState<boolean | null>(null);
  const { mutate: postLogout } = useLogoutQuery();

  const handleLogoutClick = () => {
    postLogout();
  };

  useEffect(() => {
    const cookie = getCookieValue(document.cookie, "userId");
    setIsLogined(!!cookie);
  }, []);

  if (isLogined === null) {
    return null;
  }

  return (
    <header role="banner" className={"fixed left-0 top-0 z-[999] flex w-full justify-center bg-white"}>
      <div className="w-full max-w-1088">
        <div className="flex flex-wrap items-center justify-between gap-16 px-20 py-10 tablet:flex-nowrap tablet:gap-30 tablet:px-32 tablet:py-15">
          <Link href="/" aria-label="메인페이지로 이동" className="shrink-0">
            <Logo className="w-84 tablet:w-112" />
          </Link>
          {isLogined ? (
            <Button
              onClick={handleLogoutClick}
              className="w-60 text-14-bold transition hover:text-primary tablet:text-16-bold"
            >
              로그아웃
            </Button>
          ) : (
            <Link href="/signin" className="text-14-bold transition hover:text-primary tablet:text-16-bold">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
