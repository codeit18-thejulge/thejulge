import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const ModalBasic = ({ isOpen, onClose, children, closeOnOverlayClick = true, closeOnEsc = true }: ModalProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-overlay p-24"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className="tablet:min-h-250px flex min-h-220 w-full max-w-540 items-center justify-center rounded-lg border bg-white p-24"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ModalBasic;
