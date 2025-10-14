import Logo from "@/assets/svgs/logo-md.svg";
import Link from "next/link";
import { cn } from "@/utils";
import SearchInput from "./SearchInput";
import UserHeader from "./UserHeader";

interface HeaderProps {
  placeholder?: string;
  onSearch: (search: string) => void;
}

const Header = ({placeholder, onSearch}: HeaderProps) => {
  return (
    <header role="banner" className={cn("sticky flex w-full justify-center")}>
      <div className="w-full max-w-1088">
        <div className="flex flex-wrap items-center justify-center gap-16 px-20 py-10 tablet:flex-nowrap tablet:gap-30 tablet:px-32 tablet:py-15">
          <Link href="/" aria-label="메인페이지로 이동" className="shrink-0">
            <Logo className="w-84 tablet:w-112" />
          </Link>
          <SearchInput placeholder={placeholder} onSearch={onSearch} />
          <UserHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
