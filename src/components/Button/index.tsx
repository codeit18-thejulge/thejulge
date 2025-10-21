import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

const disabledStyle = "disabled:bg-gray-40 disabled:text-white";
const BtnStyle = {
  filled: `bg-green-60 text-white ${disabledStyle}`,
  lined: `bg-white border-green-60 border-solid text-green-60 border ${disabledStyle}`,
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
      className={cn("inline-block w-full rounded-md text-14-bold", status && BtnStyle[status], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
