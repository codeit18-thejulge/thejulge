import Button from "../Button";
import IcSearch from "@/assets/svgs/ic_search.svg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#F3F2FF] to-[#FAFAFC] px-16 py-64">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-16">
          <h1 className="text-center text-48 font-bold">
            <span>원하는 알바,</span>
            <div>
              <span className="text-primary">The julge</span>
              <span>에서 찾으세요</span>
            </div>
          </h1>

          <p className="text-center text-20 text-gray-50">
            급하게 일손이 필요한 사장님과 알바를 찾는 당신을 연결합니다
          </p>

          <div className="flex justify-center gap-12">
            <div className="relative">
              <IcSearch className="absolute left-15 top-20 w-20 text-black" />
              <input
                type="text"
                className="h-full rounded-xl pl-50 placeholder:text-black focus:outline-gray-50 tablet:w-600"
                placeholder="공고명, 업체명으로 검색"
              />
            </div>
            <Button status="filled" className="w-100 py-20 transition hover:bg-red-40">
              검색
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-center gap-24 border-t-2 pt-24">
          <div className="text-center">
            <div className="text-28-bold text-primary">1,234</div>
            <div className="text-14-bold">활성 공고</div>
          </div>
          <div className="h-45 w-1 bg-gray-50"></div>
          <div className="text-center">
            <div className="text-28-bold text-primary">5,678</div>
            <div className="text-14-bold">등록 업체</div>
          </div>
          <div className="h-45 w-1 bg-gray-50"></div>
          <div className="text-center">
            <div className="text-28-bold text-primary">12,345</div>
            <div className="text-14-bold">지원자</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
