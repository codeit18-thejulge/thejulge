import Ic_X from "@/assets/svgs/ic_X.svg";
import { SEOUL_ADDRESS } from "@/constants/SEOUL_ADDRESS";
import { useEffect, useState } from "react";
import ClosedBadge from "../Badge/ClosedBadge";
import { cn } from "@/utils";

interface FilterProps {
  onClose: () => void;
  isOpen: boolean;
  closeOnEsc: boolean;
}

const MAX_SELECTION = 4;

const Filter = ({ onClose, isOpen, closeOnEsc = true }: FilterProps) => {
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const handleAddressClick = (address: string) => {
    const isSelected = selectedAddresses.includes(address);

    if (isSelected) {
      setSelectedAddresses((selectedAddresses) =>
        selectedAddresses.filter((selectedAddress) => selectedAddress !== address),
      );
    } else {
      if (selectedAddresses.length >= MAX_SELECTION) {
        window.alert("최대 4개까지만 선택 가능합니다.");
        return;
      }
      setSelectedAddresses((selectedAddresses) => [...selectedAddresses, address]);
    }
  };

  const handleDelete = (address: string) => {
    setSelectedAddresses((selectedAddresses) =>
      selectedAddresses.filter((selectedAddress) => selectedAddress !== address),
    );
  };

  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex h-845 w-375 flex-col gap-24 rounded-10 border border-gray-20 px-12 py-24 shadow-md tablet:w-390 tablet:px-20">
      <div className="flex justify-between">
        <p className="font-sans text-xl font-bold text-black">상세 필터</p>
        <Ic_X onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-12">
        <p className="font-sans text-16 text-black">위치</p>
        <div className="h-258 w-350 overflow-x-scroll rounded-6 border border-gray-20">
          <div className="grid grid-cols-2 gap-18 px-25 py-15">
            {SEOUL_ADDRESS.map((address) => {
              const chosen = selectedAddresses.includes(address);
              return (
                <div
                  key={address}
                  className={cn("cursor-pointer", chosen ? "text-primary" : "text-black")}
                  onClick={() => handleAddressClick(address)}
                >
                  {address}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid h-82 grid-cols-2 gap-8">
          {selectedAddresses.map((address) => (
            <ClosedBadge key={address} propText={address} onDelete={() => handleDelete(address)} />
          ))}
        </div>
      </div>
      <hr />
      <div className="h-92 border">
        <p>인풋 자리1</p>
      </div>
      <hr />
      <div className="h-92 border">
        <p>인풋 자리2</p>
      </div>
      <div className="h-48 border">
        <p>버튼 자리</p>
      </div>
    </div>
  );
};

export default Filter;
