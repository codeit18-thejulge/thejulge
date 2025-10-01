import { SeoulAddress } from "./user";

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
