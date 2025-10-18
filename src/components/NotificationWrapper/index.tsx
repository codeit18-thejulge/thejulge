import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import Notification from "@/components/Notification";
import { cn } from "@/utils";

interface NotificationWrapperProps {
  onClose: () => void;
  className?: string;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const NotificationWrapper = ({ onClose, className, btnRef }: NotificationWrapperProps) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const isMobile = window.innerWidth < 744;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const updateCoords = useCallback(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 10,
        left: rect.right - 368 + window.scrollX,
      });
    }
  }, [btnRef]);

  useEffect(() => {
    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords);
    };
  }, [btnRef, updateCoords]);
  useEffect(() => {
    if (isMobile && mounted) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={cn(isMobile ? "fixed inset-0 h-full w-full" : "absolute", "z-50", className)}
      style={isMobile ? {} : { top: coords.top, left: coords.left }}
    >
      <Notification onClose={onClose} />
    </div>,
    document.body,
  );
};

export default NotificationWrapper;
