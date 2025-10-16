import { ShopCategory } from "@/types/global";

export const SHOP_CATEGORY: ShopCategory[] = ["한식", "중식", "일식", "양식", "분식", "카페", "편의점", "기타"];

export const SHOP_CATEGORY_OPTIONS = SHOP_CATEGORY.map((category) => ({
  value: category,
  label: category,
}));
