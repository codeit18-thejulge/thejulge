import IcUserPlus from "@/assets/svgs/ic_userplus.svg";
import IcSearch from "@/assets/svgs/ic_search.svg";
import IcMessage from "@/assets/svgs/ic_message.svg";
import IcCheckCircle from "@/assets/svgs/ic_check-circle.svg";
import IcZap from "@/assets/svgs/ic_zap.svg";
import IcBell from "@/assets/svgs/ic_bell.svg";
import IcDollar from "@/assets/svgs/ic_dollar.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import IcShield from "@/assets/svgs/ic_shield.svg";
import IcDocument from "@/assets/svgs/ic_document.svg";

export const STEPS = [
  {
    id: 1,
    icon: IcUserPlus,
    title: "회원가입",
    description: "간단한 정보만 입력하면 가입 완료! 이메일 또는 소셜 로그인으로 빠르게 시작하세요.",
  },
  {
    id: 2,
    icon: IcSearch,
    title: "공고 검색",
    description: "원하는 지역, 시급, 날짜를 선택해서 딱 맞는 알바를 찾아보세요.",
  },
  {
    id: 3,
    icon: IcMessage,
    title: "지원하기",
    description: "마음에 드는 공고에 클릭 한 번으로 간편하게 지원하세요.",
  },
  {
    id: 4,
    icon: IcCheckCircle,
    title: "근무 시작",
    description: "사장님의 승인을 받으면 바로 일할 수 있어요!",
  },
];

export const FAQS = [
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

export const REASONS = [
  {
    id: 1,
    icon: IcZap,
    title: "즉시 지원",
    description: "공고를 보고 마음에 들면 바로 지원! 복잡한 절차 없이 클릭 한 번이면 끝.",
  },
  {
    id: 2,
    icon: IcDollar,
    title: "높은 시급",
    description: "급하게 구인하는 공고는 기존보다 높은 시급을 제공해요.",
  },
  {
    id: 3,
    icon: IcBell,
    title: "실시간 알림",
    description: "내가 신청한 공고가 승인 되었는지 즉시 알림을 받아보세요.",
  },
  {
    id: 4,
    icon: IcShield,
    title: "안전한 거래",
    description: "검증된 업체만 등록 가능하며, 안전한 거래를 하세요.",
  },
  {
    id: 5,
    icon: IcAddress,
    title: "내 주변 맞춤 일자리",
    description: "선호 지역을 선택하여 일자리를 추천받고, 즉시 공고를 확인하세요.",
  },
  {
    id: 6,
    icon: IcDocument,
    title: "간편 프로필 관리",
    description: "프로필 한 번만 등록해두면, 여러 공고에 원클릭으로 지원할 수 있어요.",
  },
];
