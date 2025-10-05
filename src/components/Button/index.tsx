import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

const BtnStyle = {
  filled: "bg-primary text-white",
  lined: "bg-white border-primary border-solid text-primary border",
  disabled: "bg-gray-40 text-white",
};

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface BtnStatus extends ButtonProps {
  status: keyof typeof BtnStyle;
  children: React.ReactNode;
}

const Button = ({ status, children, disabled, className, ...props }: BtnStatus) => {
  const isDisabled = disabled || status === "disabled";

  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={isDisabled}
      className={cn(BtnStyle[status], "inline-block w-full max-w-350 rounded-md text-14-bold", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
