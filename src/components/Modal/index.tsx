import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const Modal = ({ isOpen, onClose, children, closeOnOverlayClick = true, closeOnEsc = true }: ModalProps) => {
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
      className="bg-black bg-opacity-70 z-50 inset-0 fixed flex justify-center items-center"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div className="bg-white w-full max-w-[540px] rounded-lg p-24" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
