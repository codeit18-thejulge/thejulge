import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  errorMsg?: string;
  placeholder?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange, errorMsg, placeholder = "입력", ...rest }, ref) => {
    return (
      <>
        <textarea
          ref={ref}
          className="h-153 w-full resize-none rounded-md border border-gray-30 bg-white px-20 py-16 text-16 focus:outline-none"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
        {errorMsg && <p className="mt-8 text-12 text-red-40">{errorMsg}</p>}
      </>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
