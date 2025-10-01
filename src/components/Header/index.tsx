import Logo from "@/assets/svgs/logo-md.svg";
import IcSearch from "@/assets/svgs/ic_search.svg";
import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";

const Header = () => {
  const searchPhrase = "가게 이름으로 찾아보세요";

  return (
    <header role="banner" className="w-full sticky flex justify-center">
      <div className="w-full max-w-1088">
        <div className="flex flex-wrap tablet:flex-nowrap items-center justify-center gap-16 tablet:gap-30 px-20 tablet:px-32 py-10 tablet:py-15">
          <Link href="/" aria-label="메인페이지로 이동" className="shrink-0">
            <Logo className="w-84 tablet:w-112" />
          </Link>

          {/* Search Component */}
          <div className="bg-gray-10 rounded-10 w-full tablet:max-w-450 flex items-center p-8 tablet:p-10 gap-8 tablet:gap-10 order-3 tablet:order-2">
            <IcSearch className="w-16 tablet:w-20" />
            <input
              type="text"
              id="search"
              placeholder={searchPhrase}
              className="w-full h-20 bg-inherit text-12-regular tablet:text-14-regular placeholder-gray-40 outline-none"
            />
          </div>

          {/* UserHeader Component */}
          <nav className="h-30 tablet:h-40 ml-auto flex shrink-0 order-2 tablet:order-3">
            {/* 사장-로그인 */}
            <ul className="flex items-center gap-16 desktop:gap-40 ">
              <li>
                <Link href="" className="text-14-bold tablet:text-16-bold">
                  내 가게
                </Link>
              </li>
              <li>
                <Link href="" className="text-14-bold tablet:text-16-bold">
                  로그아웃
                </Link>
              </li>
              <li>
                <button aria-label="알림 열기" className="flex">
                  <IcNoti className="w-20 tablet:w-24 text-primary" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
