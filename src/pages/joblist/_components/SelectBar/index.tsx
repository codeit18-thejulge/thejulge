import SelectBox from "@/components/SelectBox";
import { SORT_OPTIONS } from "@/constants/SORT_OPTIONS";
import React from "react";
import Filter from "../Filter";
import { getNoticesRequest } from "@/hooks/api/notice/useGetNoticesQuery";

type SelectBarProps = {
  sort: string;
  openFilter: boolean;
  onCloseFilter: () => void;
  onSortChange: (option: { value: string; label: string }) => void;
  onFilterToggle: () => void;
  onApplyFilter: (filters: getNoticesRequest) => void;
};

const SelectBar = ({
  sort,
  openFilter,
  onCloseFilter,
  onSortChange,
  onFilterToggle,
  onApplyFilter,
}: SelectBarProps) => {
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
        className="h-40 flex-shrink-0 rounded-5 bg-red-30 px-12 py-6 text-16 font-bold text-white"
        onClick={onFilterToggle}
      >
        상세 필터
      </button>
      {openFilter && (
        <div className="absolute right--1 top-50 z-50 tablet:right-0">
          <Filter
            isOpen={openFilter}
            onClose={onCloseFilter}
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
