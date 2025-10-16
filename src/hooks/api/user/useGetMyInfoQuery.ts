import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

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
  const response = await instance.get(`/users/${userId}`);
  return response.data;
};

export const useGetMyInfoQuery = (userId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
    enabled: options?.enabled ?? true,
  });
};
