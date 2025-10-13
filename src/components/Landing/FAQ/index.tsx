import FAQItem from "./FAQItem";
import { useState } from "react";
import { FAQS } from "@/constants/LANDING_VARIABLES";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-96">
      <div className="mx-auto max-w-6xl px-18">
        <div className="mb-16 text-center">
          <h2 className="mb-12 text-32 font-bold">자주 묻는 질문</h2>
          <p className="text-20">
            <span className="font-bold text-primary">The julge</span>의 궁금한 점을 빠르게 확인해보세요
          </p>
        </div>
        <div className="mt-30">
          {FAQS.map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onClick={() => handleToggle(faq.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
