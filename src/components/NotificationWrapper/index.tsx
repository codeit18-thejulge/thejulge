import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Notification from "@/components/Notification";
import { cn } from "@/utils";

interface NotificationWrapperProps {
  onClose: () => void;
  className?: string;
}

const NotificationWrapper = ({ onClose, className }: NotificationWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className={cn("fixed right-0 top-70 z-[9999]", className)}>
      <Notification onClose={onClose} />
    </div>,
    document.body,
  );
};

export default NotificationWrapper;
