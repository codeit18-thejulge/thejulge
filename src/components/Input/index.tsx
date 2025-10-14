import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isUnit?: string;
  errorMsg?: string;
  autoComplete?: string;
}

const inputStyle = {
  basic: "w-full border-solid border rounded-md h-58 border-gray-30",
  error: "border-red-40",
  pay: "flex justify-between",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isUnit, errorMsg, className, autoComplete = "off", ...props }, ref) => {
    return (
      <>
        <div className={cn(inputStyle.basic, errorMsg && inputStyle.error, isUnit && inputStyle.pay)}>
          <input
            name={props.name}
            type={props.type}
            value={props.value}
            placeholder="입력"
            className={cn("w-full bg-transparent px-20 py-16 focus:outline-none", isUnit && "w-[90%]", className)}
            ref={ref}
            autoComplete={autoComplete}
            {...props}
          />
          {isUnit && <span className="py-16 pr-20 text-16">{isUnit}</span>}
        </div>
        {errorMsg && <p className="mt-8 text-12 text-red-40">{errorMsg}</p>}
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
