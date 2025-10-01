import Logo from "@/assets/svgs/logo-md.svg";
import IcSearch from "@/assets/svgs/ic_search.svg";
import IcNoti from "@/assets/svgs/ic_notification.svg";
import Link from "next/link";

const Header = () => {
  const searchPhrase = "가게 이름으로 찾아보세요";

  return (
    <header role="banner">
      <div className="gnb w-full sticky flex justify-center">
        <div className="gnb-container w-full lg:max-w-1024">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-16 md:gap-30 px-20 md:px-32 py-10 md:py-15">
            <Link href="/">
              <Logo alt="메인페이지로 이동" className="w-84 md:w-112 shrink-0" />
            </Link>

            {/* Search Component */}
            <div className="bg-gray-10 rounded-10 w-full md:max-w-344 lg:max-w-450 flex items-center p-8 md:p-10 gap-8 md:gap-10 order-3 md:order-2">
              <IcSearch className="w-16 md:w-20" />
              <input
                type="text"
                id="search"
                placeholder={searchPhrase}
                className="w-full h-20 bg-inherit text-12-regular md:text-14-regular placeholder-gray-40 outline-none"
              />
            </div>

            {/* UserHeader Component */}
            <nav className="h-30 md:h-40 ml-auto flex items-center gap-16 lg:gap-40 shrink-0 order-2 md:order-3">
              {/* 사장-로그인 */}
              <ul>
                <li>
                  <Link href="" className="text-14-bold md:text-16-bold">
                    내 가게
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-14-bold md:text-16-bold">
                    로그아웃
                  </Link>
                </li>
                <li>
                  <button aria-label="알림 열기" className="">
                    <IcNoti className="w-20 md:w-24 text-primary" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
