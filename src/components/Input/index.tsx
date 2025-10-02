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
  basic: "border-solid border rounded-md w-full h-58 border-gray-30",
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
          className={cn("w-full px-20 py-16 focus:outline-none", isPay && "w-[90%]", props.className)}
          {...props}
        />
        {isPay && <span className="py-16 text-16 pr-20">원</span>}
      </div>
      {errorMsg && <p className="text-red-40 text-12 mt-8">{errorMsg}</p>}
    </>
  );
};

export default Input;
