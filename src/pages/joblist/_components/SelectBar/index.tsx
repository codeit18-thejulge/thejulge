import SelectBox from "@/components/SelectBox";
import { SORT_OPTIONS } from "@/constants/SORT_OPTIONS";
import React, { useState } from "react";
import Filter from "../Filter";
import { getNoticesRequest } from "@/hooks/api/notice/useGetNoticesQuery";

type SelectBarProps = {
  sort: string;
  onSortChange: (option: { value: string; label: string }) => void;
  onApplyFilter: (filters: getNoticesRequest) => void;
};

const SelectBar = ({ sort, onSortChange, onApplyFilter }: SelectBarProps) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterToggle = () => {
    setOpenFilter((prev) => !prev);
  };

  return (
    <div className="relative flex gap-10">
      <SelectBox
        options={SORT_OPTIONS}
        placeholder={SORT_OPTIONS.find((option) => option.value === sort)?.label}
        className="min-w-114 border-none bg-gray-10 px-12 py-8 text-14 font-bold"
        dropdownClassname="border-gray-10"
        onChange={onSortChange}
      />
      <button
        type="button"
        className="h-40 flex-shrink-0 rounded-5 bg-red-30 px-12 py-6 text-16 font-bold text-white"
        onClick={handleFilterToggle}
      >
        상세 필터
      </button>
      {openFilter && (
        <div className="absolute right--1 top-50 z-50 tablet:right-0">
          <Filter
            isOpen={openFilter}
            onClose={handleFilterToggle}
            closeOnEsc={true}
            className={"bg-white"}
            onApply={onApplyFilter}
          />
        </div>
      )}
    </div>
  );
};

export default SelectBar;
