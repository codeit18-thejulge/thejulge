import Button from "@/components/Button";
import Link from "next/link";

const EmptyApplicationLog = () => {
  return (
    <div className="mx-auto mb-60 flex max-w-5xl flex-col gap-12 px-24">
      <h2 className="text-20-bold tablet:text-28-bold">신청 내역</h2>
      <section className="flex flex-col items-center justify-center gap-24 rounded-xl border border-gray-20 px-24 py-60">
        <p className="text-14-regular tablet:text-16-regular">아직 신청 내역이 없어요</p>
        <Link href="/joblist">
          <Button status="filled" className="w-150 px-20 py-10 tablet:w-346">
            공고 보러가기
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default EmptyApplicationLog;
