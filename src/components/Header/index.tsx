import Logo from "@/assets/svgs/logo-md.svg";
import Link from "next/link";
import { cn } from "@/utils";
import SearchInput from "./SearchInput";
import { useState } from "react";
import UserHeader from "./UserHeader";

const Header = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <header role="banner" className={cn("w-full sticky flex justify-center")}>
      <div className={cn("w-full max-w-1088")}>
        <div
          className={cn(
            "flex flex-wrap tablet:flex-nowrap items-center justify-center gap-16 tablet:gap-30 px-20 tablet:px-32 py-10 tablet:py-15",
          )}
        >
          <Link href="/" aria-label="메인페이지로 이동" className="shrink-0">
            <Logo className={cn("w-84 tablet:w-112")} />
          </Link>

          <SearchInput value={inputValue} onChange={setInputValue} />
          <UserHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
