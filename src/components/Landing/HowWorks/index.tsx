import React from "react";
import IcUserPlus from "@/assets/svgs/ic_userplus.svg";
import IcSearch from "@/assets/svgs/ic_search.svg";
import IcMessage from "@/assets/svgs/ic_message.svg";
import IcCheckCircle from "@/assets/svgs/ic_check-circle.svg";

const STEPS = [
  {
    id: 1,
    icon: IcUserPlus,
    title: "회원가입",
    description: "간단한 정보만 입력하면 가입 완료! 이메일 또는 소셜 로그인으로 빠르게 시작하세요.",
  },
  {
    id: 2,
    icon: IcSearch,
    title: "공고 검색",
    description: "원하는 지역, 시급, 날짜를 선택해서 딱 맞는 알바를 찾아보세요.",
  },
  {
    id: 3,
    icon: IcMessage,
    title: "지원하기",
    description: "마음에 드는 공고에 클릭 한 번으로 간편하게 지원하세요.",
  },
  {
    id: 4,
    icon: IcCheckCircle,
    title: "근무 시작",
    description: "사장님의 승인을 받으면 바로 일할 수 있어요!",
  },
];

const HowWorks = () => {
  return (
    <section className="px-16 py-96">
      <div className="mx-auto max-w-6xl px-4 px-6 tablet:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-32 font-bold">이용 방법</h2>
          <p className="text-20">
            <span className="font-bold text-primary">The julge</span>는 이렇게 사용해요
          </p>
        </div>

        <div className="mt-50 grid grid-cols-1 gap-24 tablet:grid-cols-2 desktop:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.id} className="relative">
              <div className="flex flex-col items-center gap-12 text-center">
                <div className="mb-4 flex items-center justify-center rounded-full bg-red-10 p-16">
                  <step.icon className="h-32 w-32 text-primary" />
                </div>
                <h3 className="text-18-bold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="absolute left-[65%] top-32 hidden h-0.5 w-[80%] bg-gray-20 desktop:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
