import IcArrow from "@/assets/svgs/ic_downarrow.svg";
import { cn } from "@/utils";

interface Props {
  faq: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ faq, isOpen, onClick }: Props) => {
  return (
    <div className="border-b border-gray-20 py-20">
      <button
        type="button"
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-18-bold underline-offset-4 group-hover:underline">{faq.question}</span>
        <IcArrow className={cn("h-20 w-20 text-gray-30", isOpen ? "rotate-180" : "rotate-0")} />
      </button>

      {isOpen && (
        <div className="pr-24 pt-12">
          <p className="text-16-regular text-gray-50">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
