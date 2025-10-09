import { Link, ShopItem, UserInfoItem, UserItem, UserType } from "@/types/global";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "os";

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

export const useGetMyInfoQuery = (userId: string) => {
  return useQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
  });
};
