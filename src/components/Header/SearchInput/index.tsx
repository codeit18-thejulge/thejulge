import IcSearch from "@/assets/svgs/ic_search.svg";
import { cn } from "@/utils";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const searchPhrase = "가게 이름으로 찾아보세요";

const SearchInput = ({ value = "", onChange, placeholder = searchPhrase }: SearchInputProps) => {
  return (
    <div
      className={cn(
        "bg-gray-10 rounded-10 w-full tablet:max-w-450 flex items-center p-8 tablet:p-10 gap-8 tablet:gap-10 order-3 tablet:order-2",
      )}
    >
      <IcSearch className={cn("w-16 tablet:w-20")} />
      <input
        type="text"
        id="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-20 bg-inherit text-12-regular tablet:text-14-regular text-black placeholder-gray-40 outline-none",
        )}
      />
    </div>
  );
};

export default SearchInput;
