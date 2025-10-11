import { useEffect } from "react";

interface useEscCloseProps {
  isOpen: boolean;
  closeOnEsc: boolean;
  onClose: () => void;
}

export const useEscClose = ({ isOpen, closeOnEsc, onClose }: useEscCloseProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);
};
