import IcSearch from "@/assets/svgs/ic_search.svg";
import { cn } from "@/utils";
import { useRouter } from "next/router";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
}

const SEARCH_PLACEHOLDER = "가게 이름으로 찾아보세요";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ placeholder, ...props }, ref) => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    const trimmedValue = inputValue.trim();
    router.push(`/joblist?keyword=${trimmedValue}`);
  };

  useEffect(() => {
    if (router.pathname === "/joblist") {
      const keyword = router.query.keyword as string;
      setInputValue(keyword || "");
    } else {
      setInputValue("");
    }
  }, [router.pathname, router.query.keyword]);

  return (
    <div className="order-3 flex w-full items-center gap-8 rounded-10 bg-gray-10 p-8 tablet:order-2 tablet:max-w-450 tablet:gap-10 tablet:p-10">
      <IcSearch className="w-16 tablet:w-20" />
      <input
        type="text"
        aria-label="공고 검색"
        value={inputValue}
        ref={ref}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || SEARCH_PLACEHOLDER}
        className={cn(
          "h-20 w-full bg-inherit text-12-regular text-black outline-none tablet:text-14-regular",
          placeholder === "" ? "placeholder-gray-40" : "placeholder-black",
        )}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
