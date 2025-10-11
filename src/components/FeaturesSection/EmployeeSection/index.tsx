import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import imgPost1 from "@/assets/svgs/img_post1.png";
import imgPost2 from "@/assets/svgs/img_post2.png";

const EmployeeSection = () => {
  const router = useRouter();

  const handleJobClick = () => {
    router.push("/joblist");
  };
  return (
    <section className="mx-auto flex max-w-6xl items-center justify-between gap-24 px-16 py-80">
      <div className="flex flex-col justify-center gap-12">
        <h2 className="text-32 font-bold">이런 알바는 어때요?</h2>
        <p className="text-24">
          지금 <span className="font-bold text-primary">The julge</span>에서 공고들을 만나보세요
        </p>

        <Button
          status="filled"
          className="mt-24 py-16 text-20-bold transition hover:bg-red-40"
          onClick={handleJobClick}
        >
          공고 보러가기
        </Button>
      </div>
      <div className="flex">
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          whileInView={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max:w-[300px] z-10 rounded-xl shadow-2xl"
        >
          <Image src={imgPost1} alt="첫 번째 공고 카드" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          whileInView={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max:w-[300px] rounded-xl shadow-2xl"
        >
          <Image src={imgPost2} alt="두 번째 공고 카드" />
        </motion.div>
      </div>
    </section>
  );
};

export default EmployeeSection;
