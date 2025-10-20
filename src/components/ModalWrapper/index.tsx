import React from "react";
import MessageModal, { MessageModalProps } from "@/components/Modal/MessageModal";

export type ModalType = "confirm" | "action";

export interface ModalButton {
  buttonText: string;
  style: "filled" | "lined";
  onClick: () => void;
  className: string;
}
export interface ModalProps {
  message: string;
  footers: ModalButton[];
}
interface GetModalContentProps {
  type: ModalType;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  btnText?: {
    cancel?: string;
    confirm?: string;
  };
}

export const getModalContent = ({ type, message, onConfirm, onClose, btnText }: GetModalContentProps): ModalProps => {
  const footers: ModalButton[] = [];
  if (type === "action") {
    footers.push({ buttonText: btnText?.cancel ?? "취소", style: "lined", onClick: onClose, className: "w-120 h-48" });
  }
  footers.push({
    buttonText: btnText?.confirm ?? "확인",
    style: "filled",
    onClick: onConfirm,
    className: "w-120 h-48",
  });
  return { message, footers };
};

const ModalWrapper = (props: MessageModalProps) => {
  return <MessageModal {...props} />;
};

export default ModalWrapper;
