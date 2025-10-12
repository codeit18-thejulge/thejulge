import IcZap from "@/assets/svgs/ic_zap.svg";
import IcBell from "@/assets/svgs/ic_bell.svg";
import IcDollar from "@/assets/svgs/ic_dollar.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import IcShield from "@/assets/svgs/ic_shield.svg";
import IcDocument from "@/assets/svgs/ic_document.svg";

const REASONS = [
  {
    id: 1,
    icon: IcZap,
    title: "즉시 지원",
    description: "공고를 보고 마음에 들면 바로 지원! 복잡한 절차 없이 클릭 한 번이면 끝.",
  },
  {
    id: 2,
    icon: IcDollar,
    title: "높은 시급",
    description: "급하게 구인하는 공고는 기존보다 높은 시급을 제공해요.",
  },
  {
    id: 3,
    icon: IcBell,
    title: "실시간 알림",
    description: "내가 신청한 공고가 승인 되었는지 즉시 알림을 받아보세요.",
  },
  {
    id: 4,
    icon: IcShield,
    title: "안전한 거래",
    description: "검증된 업체만 등록 가능하며, 안전한 거래를 하세요.",
  },
  {
    id: 5,
    icon: IcAddress,
    title: "내 주변 맞춤 일자리",
    description: "선호 지역을 선택하여 일자리를 추천받고, 즉시 공고를 확인하세요.",
  },
  {
    id: 6,
    icon: IcDocument,
    title: "간편 프로필 관리",
    description: "프로필 한 번만 등록해두면, 여러 공고에 원클릭으로 지원할 수 있어요.",
  },
];

const ReasonToUse = () => {
  return (
    <section className="bg-gray-5 py-96">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 tablet:px-6 desktop:px-8">
        <div className="flex flex-col gap-12 text-center">
          <h2 className="text-32 font-bold">
            왜 <span className="text-primary">The julge</span>인가요?
          </h2>
          <p className="text-20">급한 일자리를 찾는 당신을 위한 특별한 기능들</p>
        </div>

        <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <div
              key={reason.id}
              className="rounded-xl border bg-white px-18 py-24 text-center transition hover:shadow-lg"
            >
              <div className="inline-flex items-center rounded-full bg-red-10 p-16">
                <reason.icon className="h-32 w-32 text-primary" />
              </div>
              <h3 className="mb-8 mt-18 text-18-bold">{reason.title}</h3>
              <p className="text-16-regular">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonToUse;
