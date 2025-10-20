import { useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import Link from "next/link";
import CountUp from "react-countup";

const HeroSection = () => {
  const { data } = useGetNoticesQuery();
  const targetCount = data?.count || 0;
  return (
    <section className="bg-secondary mt-54 px-16 py-64">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-16">
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
        </div>

        <div className="mt-24 flex items-center justify-center gap-24 border-t border-gray-30 pt-24">
          <div className="text-center">
            <div className="text-20-bold">지금까지 더줄게를 통해 올라온 공고</div>
            <div className="text-28-bold">
              총{" "}
              <Link href="/joblist">
                <span className="text-38 text-primary">
                  <CountUp start={0} end={targetCount} duration={1.5} separator="," />
                </span>
              </Link>
              개
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
