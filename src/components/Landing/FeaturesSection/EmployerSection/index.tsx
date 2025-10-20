import Button from "@/components/Button";
import { useRouter } from "next/router";
import ImgJob from "/public/images/img_job.png";
import Image from "next/image";
import { motion } from "framer-motion";

const EmployerSection = () => {
  const router = useRouter();
  const handleShopClick = () => {
    router.push("/shopinfo/register");
  };

  return (
    <section className="mx-auto flex min-h-500 max-w-6xl flex-col-reverse items-center justify-between gap-24 px-16 py-80 tablet:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 rounded-xl shadow-2xl"
      >
        <Image src={ImgJob} alt="공고 등록 카드" />
      </motion.div>
      <div className="flex flex-col items-center justify-center gap-12 tablet:items-end">
        <h2 className="text-32 font-bold">직원이 필요하신가요?</h2>
        <p className="text-24">
          <span className="font-bold text-primary">The julge</span>의 간단한 구인 시스템으로 인재들을 만나보세요
        </p>

        <Button
          status="filled"
          className="hover:bg-third mt-24 max-w-300 py-16 text-20-bold transition"
          onClick={handleShopClick}
        >
          등록 하러가기
        </Button>
      </div>
    </section>
  );
};

export default EmployerSection;
