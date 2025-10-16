import { useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";

const HeroSection = () => {
  const { data } = useGetNoticesQuery();

  return (
    <section className="mt-54 bg-red-10 px-16 py-64">
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
              총 <span className="text-38 text-primary">{data?.count.toLocaleString("ko-KR")}</span>개
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
