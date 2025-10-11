import Logo from "@/assets/svgs/logo-md.svg";
import Link from "next/link";
import { cn } from "@/utils";

const LandingHeader = () => {
  const isLogined = false; // 추후 변경

  return (
    <header role="banner" className={cn("fixed top-0 flex w-full justify-center bg-white")}>
      <div className="w-full max-w-1088">
        <div className="flex flex-wrap items-center justify-between gap-16 px-20 py-10 tablet:flex-nowrap tablet:gap-30 tablet:px-32 tablet:py-15">
          <Link href="/" aria-label="메인페이지로 이동" className="shrink-0">
            <Logo className="w-84 tablet:w-112" />
          </Link>
          {!isLogined && (
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
