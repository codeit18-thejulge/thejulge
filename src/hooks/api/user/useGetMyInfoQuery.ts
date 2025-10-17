import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GetMyInfoResponse {
  item: UserItem &
    Partial<UserInfoItem> & {
      shop: {
        item: ShopItem;
      } | null;
    };
  links: Link[];
}

export const getMyInfo = async (userId: string): Promise<GetMyInfoResponse> => {
  const response = await axios.get(`/api/proxy/users/${userId}`);
  return response.data;
};

export const useGetMyInfoQuery = (userId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
    enabled: options?.enabled ?? true,
  });
};
