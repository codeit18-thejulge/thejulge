import { Shop } from "./shop";

// 사장&알바 상세 공고 조회
export interface Notice {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  createdAt: string;
  user: {
    item: {
      id: string;
      email: string;
      type: string;
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
      description?: string;
    };
  };
  shop: {
    item: Shop;
    href: string;
  };
  notice?: {
    item: {
      id: string;
      hourlyPay: number;
      description: string;
      startsAt: string;
      workhour: number;
      closed: boolean;
    };
    href: string;
  };
}
