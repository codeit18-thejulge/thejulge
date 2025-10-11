import Button from "@/components/Button";
import { useRouter } from "next/router";
import imgShop from "@/assets/svgs/img_shop.png";
import Image from "next/image";
import { motion } from "framer-motion";

const EmployerSection = () => {
  const router = useRouter();
  const handleShopClick = () => {
    router.push("/shopinfo/register"); // 해당페이지에서 로그인검사 -> 로그인페이지로 리다이렉트
  };

  return (
    <section className="mx-auto flex min-h-500 max-w-6xl items-center justify-between gap-24 px-16 py-80">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 rounded-xl shadow-2xl"
      >
        <Image src={imgShop} alt="공고 등록 카드" />
      </motion.div>
      <div className="flex flex-col items-end justify-center gap-12">
        <h2 className="text-32 font-bold">직원이 필요하신가요?</h2>
        <p className="text-24">
          <span className="font-bold text-primary">The julge</span>의 간단한 구인 시스템으로 인재들을 만나보세요
        </p>

        <Button
          status="filled"
          className="mt-24 py-16 text-20-bold transition hover:bg-red-40"
          onClick={handleShopClick}
        >
          등록 하러가기
        </Button>
      </div>
    </section>
  );
};

export default EmployerSection;
