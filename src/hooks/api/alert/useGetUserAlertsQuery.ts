import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { AlertItem, ApplicationItem, Link, NoticeItem, ShopItem } from "@/types/global";

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

const getUserAlerts = async ({ userId, params }: GetUserAlertsRequest): Promise<GetUserAlertsResponse> => {
  const response = await instance.get(`/users/${userId}/alerts`, { params });
  return response.data;
};

export const useGetUserAlertsQuery = ({ userId, params }: GetUserAlertsRequest) => {
  return useQuery({
    queryKey: ["getUserAlerts", userId, params],
    queryFn: () => getUserAlerts({ userId, params }),
  });
};
