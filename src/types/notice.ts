import { ShopItem, NoticeItem, ApplicationStatus } from "./global";

// 사장&알바 상세 공고 조회
export interface Notice {
  id: string;
  status: ApplicationStatus;
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
    item: ShopItem;
    href: string;
  };
  notice?: {
    item: NoticeItem;
    href: string;
  };
}
