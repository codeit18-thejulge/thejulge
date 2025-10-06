import IcSearch from "@/assets/svgs/ic_search.svg";
import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SEARCH_PLACEHOLDER = "가게 이름으로 찾아보세요";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value = "", onChange, placeholder = SEARCH_PLACEHOLDER, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="order-3 flex w-full items-center gap-8 rounded-10 bg-gray-10 p-8 tablet:order-2 tablet:max-w-450 tablet:gap-10 tablet:p-10">
        <IcSearch className="w-16 tablet:w-20" />
        <input
          type="text"
          aria-label="공고 검색"
          value={value}
          ref={ref}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-20 w-full bg-inherit text-12-regular text-black placeholder-gray-40 outline-none tablet:text-14-regular"
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
