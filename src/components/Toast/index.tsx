import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";

interface LabelProps {
  label: string;
  error: boolean;
  errorMessage?: string;
  closedTime?: number;
}

const styleClass =
  "fixed z-50 transition-all inset-x-1/2 inset-y-2/4 -translate-y-2/4 -translate-x-2/4 min-h-fit min-w-fit whitespace-nowrap rounded-5 bg-red-30 px-17 py-11 text-16-regular text-white opacity-0 -translate-y-1/4";
const show = "opacity-1 -translate-y-2/4";

// 컨테이너 렌더링
const ToastContainer = ({ label, error, closedTime = 3000, errorMessage = "다시 시도해 주세요" }: LabelProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setMounted(false);
    }, closedTime + 1000); // 애니메이션 종료 후 제거

    return () => clearTimeout(timer);
  }, [closedTime]);

  return <>{mounted && <Toast label={label} error={error} errorMessage={errorMessage} closedTime={closedTime} />}</>;
};

const Toast = ({ label, error, errorMessage, closedTime = 3000 }: LabelProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, closedTime);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [closedTime]);

  return (
    <>
      {createPortal(
        <div className={cn(`duration-${closedTime / 10}`, styleClass, isVisible && show, error && `bg-red-40`)}>
          {error ? errorMessage : label}
        </div>,
        document.body,
      )}
    </>
  );
};

export default ToastContainer;
