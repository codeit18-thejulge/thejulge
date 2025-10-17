import { NoticeSort } from "@/types/global";

type SortOption = {
    value:NoticeSort;
    label:string;
}
export const SORT_OPTIONS:SortOption[] = [
  { value: 'time', label: '마감임박순' },
  { value: 'pay', label: '시급많은순' },
  { value: 'hour', label: '시간적은순' },
  { value: 'shop', label: '가나다순' },
];

