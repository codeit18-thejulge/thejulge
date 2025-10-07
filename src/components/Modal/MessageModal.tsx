import React from "react";
import ModalBasic from ".";
import Button from "../Button";

interface ButtonSetting {
  buttonText: string;
  onClick: () => void;
  style: "filled" | "lined";
  className: string;
}

interface MessageModalProps {
  isOpen: boolean;
  icon?: React.ReactNode;
  message: string;
  onClose: () => void;
  footers: ButtonSetting[];
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const MessageModal = ({
  isOpen,
  icon,
  message,
  onClose,
  footers,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: MessageModalProps) => {
  return (
    <ModalBasic isOpen={isOpen} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick} closeOnEsc={closeOnEsc}>
      <div className="flex flex-col items-center gap-16 text-center tablet:gap-26">
        {icon && <div className="mt-4">{icon}</div>}
        <p className="text-black">{message}</p>
        <div className="flex gap-8">
          {footers.map((footer) => (
            <Button key={footer.buttonText} status={footer.style} onClick={footer.onClick} className={footer.className}>
              {footer.buttonText}
            </Button>
          ))}
        </div>
      </div>
    </ModalBasic>
  );
};

export default MessageModal;
