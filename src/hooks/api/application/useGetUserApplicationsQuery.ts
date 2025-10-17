import { useQuery } from "@tanstack/react-query";
import { ApplicationItem, Link, NoticeItem, ShopItem } from "@/types/global";
import axios from "axios";

export interface GetUserApplicationsRequest {
  userId: string;
  params?: {
    offset?: number;
    limit?: number;
  };
}

export interface GetUserApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: ApplicationItem & {
      shop: {
        item: ShopItem;
        href: string;
      };
      notice: {
        item: NoticeItem;
        href: string;
      };
    };
    links: Link[];
  }>;
  links: Link[];
}

const getUserApplications = async ({
  userId,
  params,
}: GetUserApplicationsRequest): Promise<GetUserApplicationsResponse> => {
  const response = await axios.get(`/api/proxy/users/${userId}/applications`, { params });
  return response.data;
};

export const useGetUserApplicationsQuery = ({ userId, params }: GetUserApplicationsRequest) => {
  return useQuery({
    queryKey: ["getUserApplications", userId, params],
    queryFn: () => getUserApplications({ userId, params }),
  });
};
