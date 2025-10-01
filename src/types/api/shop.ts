import { Link, SeoulAddress, User } from "./user";

export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: SeoulAddress;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export type ShopRequest = Omit<Shop, "id">;

export interface ShopResponse extends Shop {
  user: {
    item: Omit<User, "shop">;
  };
  links: Link[];
}
