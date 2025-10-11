import { useRouter } from "next/router";
import Button from "../Button";

const HeroSection = () => {
  const router = useRouter();

  const handleJobClick = () => {
    router.push("/joblist");
  };
  return (
    <section className="bg-red-10 px-16 py-64">
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
            <Button status="filled" className="py-16 text-24-bold transition hover:bg-red-40" onClick={handleJobClick}>
              공고 보러가기
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-center gap-24 border-t border-gray-30 pt-24">
          <div className="text-center">
            <div className="text-28-bold text-primary">1,234</div>
            <div className="text-14-bold">활성 공고</div>
          </div>
          <div className="h-45 w-1 bg-gray-30"></div>
          <div className="text-center">
            <div className="text-28-bold text-primary">5,678</div>
            <div className="text-14-bold">등록 업체</div>
          </div>
          <div className="2 h-45 w-1 bg-gray-30"></div>
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
