import { useCallback } from "react";
import { Option } from "@/types/global";

type UseSelectHandlerProps = {
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (option: Option) => void;
};

export const useSelectHandler = ({ setSelectedLabel, setIsOpen, onChange }: UseSelectHandlerProps) => {
  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedLabel(option.label);
      setIsOpen(false);
      onChange?.(option);
    },
    [onChange],
  );

  return handleSelect;
};
