import { Link, SeoulAddress, ShopCategory, UserType } from "@/types/global";

export interface ShopResponse {
  item: {
    id: string;
    name: string;
    category: ShopCategory;
    address1: SeoulAddress;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
    user: {
      item: {
        id: string;
        email: string;
        type: UserType;
        name?: string;
        phone?: string;
        address?: string;
        bio?: string;
      };
      href: string;
    };
  };
  links: Link[];
}

export interface ShopRequest {
  name: string;
  category: ShopCategory;
  address1: SeoulAddress;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}
