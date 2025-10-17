import Logo from "@/assets/svgs/logo-md.svg";
import Link from "next/link";
import SearchInput from "./SearchInput";
import UserHeader from "./UserHeader";

interface HeaderProps {
  placeholder?: string;
}

const Header = ({ placeholder }: HeaderProps) => {
  return (
    <header role="banner" className={"sticky flex w-full justify-center bg-white"}>
      <div className="w-full max-w-1088">
        <div className="flex flex-wrap items-center justify-center gap-16 px-20 py-10 tablet:flex-nowrap tablet:gap-30 tablet:px-32 tablet:py-15">
          <Link href="/joblist" aria-label="공고 리스트 페이지로 이동" className="shrink-0">
            <Logo className="w-84 tablet:w-112" />
          </Link>
          <SearchInput placeholder={placeholder} />
          <UserHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
