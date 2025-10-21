import { REASONS } from "@/constants/LANDING_VARIABLES";

const ReasonToUse = () => {
  return (
    <section id="reason" className="bg-gray-5 py-96">
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
              <div className="bg-secondary inline-flex items-center rounded-full p-16">
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
