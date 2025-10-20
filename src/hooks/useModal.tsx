import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import ModalWrapper, { ModalProps, ModalType, getModalContent } from "@/components/ModalWrapper";

interface ModalContextType {
  openModal: (
    type: ModalType,
    message: string,
    onConfirm: () => void,
    options?: { closeOnOverlayClick?: boolean; closeOnEsc?: boolean },
  ) => void;
  closeModal: () => void;
}
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    message: "",
    footers: [],
  });
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [closeOnEsc, setCloseOnEsc] = useState(true);

  const openModal = useCallback(
    (
      type: ModalType,
      message: string,
      onConfirm: () => void,
      options?: { closeOnOverlayClick?: boolean; closeOnEsc?: boolean },
    ) => {
      const handleConfirm = () => {
        onConfirm?.();
        setIsModalOpen(false);
      };
      const content = getModalContent({
        type,
        message,
        onConfirm: handleConfirm,
        onClose: () => setIsModalOpen(false),
      });
      setModalData(content);
      setCloseOnOverlayClick(options?.closeOnOverlayClick ?? true);
      setCloseOnEsc(options?.closeOnEsc ?? true);
      setIsModalOpen(true);
    },
    [],
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalWrapper
        isOpen={isModalOpen}
        message={modalData.message}
        footers={modalData.footers}
        onClose={closeModal}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEsc={closeOnEsc}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal은 ModalProvider 안에서 사용되어야 합니다.");
  }

  return context;
};
