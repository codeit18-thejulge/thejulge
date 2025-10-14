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
  onConfirm: () => void; // 확인 버튼 액션
  onClose: () => void; // 모달 닫기
}

export const getModalContent = ({ type, message, onConfirm, onClose }: GetModalContentProps): ModalProps => {
  const buttons: ModalButton[] = [];
  if (type === "action") {
    buttons.push({ buttonText: "취소", style: "lined", onClick: onClose, className: "w-120 h-48" });
  }
  buttons.push({ buttonText: "확인", style: "filled", onClick: onConfirm, className: "w-120 h-48" });
  return { message, buttons };
};
