import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isPay?: boolean;
  errorMsg?: string;
}

const inputStyle = {
  basic: "w-full border-solid border rounded-md h-58 border-gray-30",
  error: "border-red-40",
  pay: "flex justify-between",
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ isPay, errorMsg, className, ...props }, ref) => {
  return (
    <>
      <div className={cn(inputStyle.basic, errorMsg && inputStyle.error, isPay && inputStyle.pay)}>
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder="입력"
          className={cn("w-full px-20 py-16 focus:outline-none", isPay && "w-[90%]", className)}
          ref={ref}
          {...props}
        />
        {isPay && <span className="py-16 pr-20 text-16">원</span>}
      </div>
      {errorMsg && <p className="mt-8 text-12 text-red-40">{errorMsg}</p>}
    </>
  );
});

Input.displayName = "Input";

export default Input;
