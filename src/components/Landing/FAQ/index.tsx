import FAQItem from "./FAQItem";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "The julge는 어떤 서비스인가요?",
    answer:
      "The julge는 급하게 일손이 필요한 사장님과 알바를 찾는 분들을 연결해주는 구인구직 플랫폼입니다. 다양한 공고를 확인하고 간편하게 지원할 수 있습니다.",
  },
  {
    id: 2,
    question: "회원가입은 무료인가요?",
    answer: "네, 회원가입과 공고 검색, 지원은 모두 무료입니다. 사장님도 간편하게 공고를 등록할 수 있어요.",
  },
  {
    id: 3,
    question: "공고는 어떻게 찾나요?",
    answer: "공고 페이지에서 원하는 지역, 시급, 근무 날짜 등을 설정하여 검색하실 수 있습니다.",
  },
  {
    id: 4,
    question: "지원 후 얼마나 기다려야 하나요?",
    answer:
      "사장님께서 지원자를 확인하는 시간에 따라 다릅니다. 하지만 사징님께서 승인, 거절에 대한 응답은 알림으로 받으실 수 있어요.",
  },
  {
    id: 5,
    question: "취소하고 싶으면 어떻게 하나요?",
    answer: "근무 시작 전에 신청 내역에서 자유롭게 취소할 수 있습니다. ",
  },
  {
    id: 6,
    question: "사장님은 어떻게 공고를 등록하나요?",
    answer:
      "회원가입 후 '내 가게' 메뉴에서 가게 정보를 등록하고, '공고 등록하기'를 통해 원하는 조건의 공고를 작성하실 수 있습니다.",
  },
];

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
            <span className="font-bold text-primary">The julge</span>의 궁금하신 점을 빠르게 확인해보세요
          </p>
        </div>
        <div className="mt-30">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onClick={() => handleToggle(faq.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
