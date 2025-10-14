import { cn } from "@/utils";
import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMsg?: string;
}

const textareaStyle = {
  basic: "h-153 w-full resize-none rounded-md border border-gray-30 bg-white px-20 py-16 text-16 focus:outline-none",
  error: "border-red-400",
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ errorMsg, ...props }, ref) => {
  return (
    <>
      <textarea
        ref={ref}
        placeholder="입력"
        className={cn(textareaStyle.basic, errorMsg && textareaStyle.error)}
        {...props}
      />
      {errorMsg && <p className="mt-8 text-12 text-red-40">{errorMsg}</p>}
    </>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
