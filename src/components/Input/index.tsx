import { cn } from "@/utils";

interface InputType {
  id: string;
  type: string;
  className?: string;
  value?: string;
  isPay?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
}

const inputStyle = {
  basic: "border-solid border rounded-md w-full h-[58px] border-gray-30",
  error: "border-red-40",
  pay: "flex justify-between",
};

const Input = ({ id, type, value, isPay, errorMsg, ...props }: InputType) => {
  return (
    <>
      <div className={cn(inputStyle.basic, errorMsg && inputStyle.error, isPay && inputStyle.pay)}>
        <input
          id={id}
          type={type}
          className={cn("w-full px-[20px] py-[16px] focus:outline-none", isPay && "w-[90%]", props.className)}
          {...props}
        />
        {isPay && <span className="py-[16px] text-16 pr-[20px]">원</span>}
      </div>
      {errorMsg && <p className="text-red-40 text-12 mt-[8px]">{errorMsg}</p>}
    </>
  );
};

export default Input;
