import React from "react";
import MessageModal from "@/components/Modal/MessageModal";

export type ModalType = "confirm" | "action";

export interface ModalButton {
  buttonText: string;
  style: "filled" | "lined";
  onClick: () => void;
  className: string;
}
export interface ModalProps {
  message: string;
  buttons: ModalButton[];
}
interface GetModalContentProps {
  type: ModalType;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const getModalContent = ({ type, message, onConfirm, onClose }: GetModalContentProps): ModalProps => {
  const buttons: ModalButton[] = [{ buttonText: "확인", style: "filled", onClick: onConfirm, className: "w-120 h-48" }];
  if (type === "action") {
    buttons.push({ buttonText: "취소", style: "lined", onClick: onClose, className: "w-120 h-48" });
  }
  return { message, buttons };
};

interface ModalWrapperProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper = ({ isOpen, message, buttons, onClose }: ModalWrapperProps) => {
  return <MessageModal isOpen={isOpen} message={message} onClose={onClose} footers={buttons} />;
};

export default ModalWrapper;
