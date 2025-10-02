import React from "react";
import Modal from ".";
import { cn } from "@/utils";

interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface ActionModalProps {
  isOpen: boolean;
  icon?: React.ReactNode;
  message: string;
  onClose: () => void;
  actions: ButtonConfig[];
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const ActionModal = ({
  isOpen,
  icon,
  message,
  onClose,
  actions,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ActionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick} closeOnEsc={closeOnEsc}>
      <div className="flex flex-col items-center gap-16 tablet:gap-26 text-center">
        {icon && <div className="mt-4">{icon}</div>}
        <p className="text-black">{message}</p>
        <div className="flex gap-8">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={cn("rounded-6 px-20 py-10 min-w-[80px] mt-16", {
                "bg-primary text-white font-bold hover:bg-red-40": action.variant === "primary",
                "border border-primary text-primary hover:bg-red-10": action.variant === "secondary",
              })}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
