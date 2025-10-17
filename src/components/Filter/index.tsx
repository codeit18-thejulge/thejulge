import Ic_X from "@/assets/svgs/ic_X.svg";
import { SEOUL_ADDRESS } from "@/constants/SEOUL_ADDRESS";
import { useRef, useState } from "react";
import ClosedBadge from "../Badge/ClosedBadge";
import { cn } from "@/utils";
import { useEscClose } from "@/hooks/useEscClose";
import Input from "../Input";
import Button from "../Button";
import { getNoticesRequest } from "@/hooks/api/notice/useGetNoticesQuery";
interface FilterProps {
  onClose: () => void;
  isOpen: boolean;
  closeOnEsc?: boolean;
  onApply: (filters: getNoticesRequest) => void;
  className?: string;
}

const MAX_SELECTION = 3;
const containerStyle =
  "flex w-375 flex-col gap-24 rounded-10 border border-gray-20 px-12 py-24 shadow-md tablet:w-390 tablet:px-20";

const Filter = ({ onClose, isOpen, closeOnEsc = true, onApply, className}: FilterProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [startsAt, setStartsAt] = useState("");
  const [pay, setPay] = useState("");
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];
  const isPayValid = !isNaN(Number(pay)) && pay.trim() !== "";

  const handleAddressClick = (address: string) => {
    const isSelected = selectedAddresses.includes(address);

    if (isSelected) {
      return setSelectedAddresses((selectedAddresses) =>
        selectedAddresses.filter((selectedAddress) => selectedAddress !== address),
      );
    }

    if (selectedAddresses.length >= MAX_SELECTION) {
      return window.alert(`최대 ${MAX_SELECTION}개까지만 선택 가능합니다.`);
    }
    setSelectedAddresses((selectedAddresses) => [...selectedAddresses, address]);
  };

  const handleDelete = (address: string) => {
    setSelectedAddresses((selectedAddresses) =>
      selectedAddresses.filter((selectedAddress) => selectedAddress !== address),
    );
  };

  const handleReset = () => {
    setSelectedAddresses([]);
    setStartsAt("");
    setPay("");
  };

  const handleApply = () => {
    const filters: getNoticesRequest = {};
    if(selectedAddresses.length > 0) {
      filters.address = selectedAddresses;
    }
    if(startsAt) {
      filters.startsAtGte = `${startsAt}T00:00:00Z`;
    }

    if(pay && !isNaN(Number(pay))) {
      filters.hourlyPayGte = Number(pay);
    }
    onApply(filters);
    onClose();
  }

  useEscClose({ isOpen, closeOnEsc, onClose });
 
  if (!isOpen) {
    return null;
  }

  return (
    <div ref={filterRef} className={cn(containerStyle, className)}>
      <div className="flex justify-between">
        <p className="font-sans text-xl font-bold text-black">상세 필터</p>
        <Ic_X onClick={onClose} className="cursor-pointer w-16 h-16" />
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
        {selectedAddresses.length !== 0 ? (
          <div className="grid h-50 grid-cols-2 gap-8">
            {selectedAddresses.map((address) => (
              <ClosedBadge key={address} propText={address} onDelete={() => handleDelete(address)} />
            ))}
          </div>
        ) : (
          <div className="flex h-50 items-center pl-10 pt-10 text-gray-30">
            <p>최대 {MAX_SELECTION}개까지 선택 가능합니다.</p>
          </div>
        )}
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <label htmlFor="startId">시작일</label>
        <Input value={startsAt} id="startId" type="date" min={today} className="bg-transparent" onChange={(e) => setStartsAt(e.target.value)}/>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <label htmlFor="payId">금액</label>
        <div className="flex items-center gap-12">
          <div className="w-full max-w-170">
            <Input value={pay} id="payId" isUnit="원" className="bg-transparent" onChange={(e) => setPay(e.target.value)}/>
          </div>
          <span>이상부터</span>
        </div>
      </div>
      <div className="flex h-48 gap-8">
        <Button status="lined" className="flex-[1]" onClick={handleReset}>
          초기화
        </Button>
        <Button disabled={!isPayValid} status="filled" className="flex-[2]" onClick={() => handleApply()}>
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default Filter;
