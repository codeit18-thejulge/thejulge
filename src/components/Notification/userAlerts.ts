import { AlertItem, ApplicationItem, ShopItem, NoticeItem, Link } from "@/types/global";

export interface GetUserAlertsRequest {
  userId: string;
  params?: {
    offset?: number;
    limit?: number;
  };
}

export interface GetUserAlertsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: AlertItem & {
      application: {
        item: Omit<ApplicationItem, "createdAt">;
        href: string;
      };
      shop: {
        item: ShopItem;
        href: string;
      };
      notice: {
        item: NoticeItem;
        href: string;
      };
      links: Link[];
    };
    links: Link[];
  }>;
}

export type UserAlertItem = GetUserAlertsResponse["items"][number]["item"];
