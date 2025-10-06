import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

const BtnStyle = {
  filled: "bg-primary text-white",
  lined: "bg-white border-primary border-solid text-primary border",
};

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface BtnStatus extends ButtonProps {
  status?: keyof typeof BtnStyle;
  children: React.ReactNode;
}

const Button = ({ status, children, className, ...props }: BtnStatus) => {
  return (
    <button
      type="button"
      className={cn(
        "inline-block w-full max-w-350 rounded-md bg-gray-40 text-14-bold text-white",
        status && BtnStyle[status],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
