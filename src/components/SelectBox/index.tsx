import React, { useState, useEffect } from "react";
import IcDropdown from "@/assets/svgs/ic_dropdown.svg";
import { Option } from "@/types/global";
import { cn } from "@/utils";
import { useSelectHandler } from "@/hooks/useSelectHandler";
import SelectOptions from "./SelectOptions";

type STYLES = { boxSelect: string; fontSelect: string };

const style: STYLES = {
  boxSelect: "bg-white rounded-md cursor-pointer border border-gray-40",
  fontSelect: "font-normal text-base text-gray-40",
};

interface SelectProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (option: Option) => void;
  dropdownClassname?: string;
  onClick?: () => void;
}

const SelectBox = ({
  isOpen,
  setIsOpen,
  options,
  placeholder = "선택",
  className,
  onChange,
  dropdownClassname,
  onClick,
}: SelectProps) => {
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  useEffect(() => {
    if (placeholder) {
      setSelectedLabel(placeholder);
    }
  }, [placeholder]);

  const handleSelect = useSelectHandler({ setSelectedLabel, setIsOpen, onChange });
  return (
    <div className={cn("relative w-full")}>
      <div
        className={cn(
          "flex items-center justify-between px-20 py-16 text-gray-40",
          style.boxSelect,
          style.fontSelect,
          className,
        )}
        onClick={() => {
          onClick?.();
          setIsOpen(!isOpen);
        }}
        aria-label="셀렉트 박스"
      >
        <span className={cn(placeholder === "선택" ? "text-gray-40" : "text-black")}>{selectedLabel}</span>
        <div
          className={cn("flex items-center justify-center transition-transform duration-200", isOpen && "rotate-180")}
        >
          <IcDropdown />
        </div>
      </div>

      <SelectOptions
        isOpen={isOpen}
        options={options}
        style={style}
        onSelect={handleSelect}
        className={dropdownClassname}
      />
    </div>
  );
};

export default SelectBox;
