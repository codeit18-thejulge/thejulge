import { cn } from "@/utils";
import { Option } from "@/types/global";

type STYLES = { boxSelect: string; fontSelect: string };

interface OptionProps {
  isOpen: boolean;
  options: Option[];
  onSelect: (option: Option) => void;
  style: STYLES;
  className?: string;
}

const SelectOptions = ({ isOpen, options, onSelect, style, className }: OptionProps) => {
  if (!isOpen) {
    return null;
  }
  console.log(options);
  return (
    <div className={cn("custom-scroll absolute left-0 right-0 z-40 my-8 overflow-y-auto", style.boxSelect, className)}>
      {options.map((option, index) => (
        <option
          key={option.value || index}
          className={cn(
            "border-b border-solid border-gray-20 py-12 text-center text-black last:border-none hover:bg-gray-100",
          )}
          onClick={() => onSelect(option)}
          aria-label="셀렉트박스 옵션"
        >
          {option.label}
        </option>
      ))}
    </div>
  );
};

export default SelectOptions;
