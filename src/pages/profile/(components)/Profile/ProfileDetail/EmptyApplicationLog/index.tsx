import Button from "@/components/Button";
import { useRouter } from "next/router";

const EmptyApplicationLog = () => {
  const router = useRouter();

  const handleJobClick = () => {
    router.push("/joblist");
  };
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 py-60">
      <h2 className="text-20-bold tablet:text-28-bold">신청 내역</h2>
      <section className="flex flex-col items-center justify-center gap-24 rounded-xl border border-gray-20 px-24 py-60">
        <p className="text-14-regular tablet:text-16-regular">아직 신청 내역이 없어요</p>
        <Button status="filled" className="px-20 py-10" onClick={handleJobClick}>
          공고 보러가기
        </Button>
      </section>
    </div>
  );
};

export default EmptyApplicationLog;
