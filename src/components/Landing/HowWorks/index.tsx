import { STEPS } from "@/constants/LANDING_VARIABLES";

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
