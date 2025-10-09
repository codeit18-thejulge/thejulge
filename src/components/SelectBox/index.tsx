import React, { useState, useCallback } from "react";
import IcDropdown from "@/assets/svgs/ic_dropdown.svg";
import { Option } from "@/types/global";
import { cn } from "@/utils";
import SelectOptions from "./SelectOptions";

type STYLES = { boxSelect: string; fontSelect: string };

const style: STYLES = {
  boxSelect: "bg-white rounded-md cursor-pointer border border-gray-40",
  fontSelect: "font-normal text-base text-gray-40",
};

interface SelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
}

const SelectBox = ({ options, placeholder="선택", className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);

  type UseSelectHandlerProps = {
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onChange?: (option: Option) => void;
  };

  const useSelectHandler = ({ setSelectedValue, setIsOpen, onChange }: UseSelectHandlerProps) => {
    const handleSelect = useCallback(
      (option: Option) => {
        setSelectedValue(option.label);
        setIsOpen(false);
        if (onChange) {
          onChange(option);
        }
      },
      [setSelectedValue, setIsOpen, onChange],
    );

    return handleSelect;
  };

  const handleSelect = useSelectHandler({ setSelectedValue, setIsOpen });

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn("flex items-center justify-between px-20 py-16 text-gray-40", style.boxSelect, style.fontSelect)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="셀렉트 박스"
      >
        <span className={cn(selectedValue === placeholder ? "text-gray-40" : "text-black")}>{selectedValue}</span>
        <div
          className={cn("flex items-center justify-center transition-transform duration-200", isOpen && "rotate-180")}
        >
          <IcDropdown />
        </div>
      </div>

      <SelectOptions isOpen={isOpen} options={options} style={style} onSelect={handleSelect} className="h-300" />
    </div>
  );
};

export default SelectBox;
