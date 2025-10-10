import { useCallback } from "react";
import { Option } from "@/types/global";

type UseSelectHandlerProps = {
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (option: Option) => void;
};

export const useSelectHandler = ({
  setSelectedValue,
  setSelectedLabel,
  setIsOpen,
  onChange,
}: UseSelectHandlerProps) => {
  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedValue(option.value);
      setSelectedLabel(option.label);
      setIsOpen(false);
      onChange?.(option);
    },
    [onChange],
  );

  return handleSelect;
};
