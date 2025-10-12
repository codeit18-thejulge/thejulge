import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyProfile = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/profile/register");
  };

  useEffect(() => {
    router.prefetch("/profile/register");
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <h2 className="text-20-bold tablet:text-28-bold">내 프로필</h2>
      <section className="flex flex-col items-center justify-center gap-24 rounded-xl border border-gray-20 px-24 py-60">
        <p className="text-14-regular tablet:text-16-regular">내 프로필을 등록하고 원하는 가게에 지원해 보세요</p>
        <Button status="filled" className="px-20 py-10" onClick={handleRegisterClick}>
          내 프로필 등록하기
        </Button>
      </section>
    </div>
  );
};

export default EmptyProfile;
