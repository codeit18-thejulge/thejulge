import { UserInfoItem } from "@/types/global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserItem, ShopItem, Link } from "@/types/global";
import axios from "axios";

export type PutMyInfoRequest = Partial<UserInfoItem>;

export interface PutMyInfoResponse {
  item: UserItem &
    Partial<UserInfoItem> & {
      shop: {
        item: ShopItem;
      } | null;
    };
  links: Link[];
}

const putMyInfo = async ({ userId, data }: { userId: string; data: PutMyInfoRequest }): Promise<PutMyInfoResponse> => {
  const response = await axios.put(`/api/proxy/users/${userId}`, data);
  return response.data;
};

export const usePutMyInfoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putMyInfo,
    onSuccess: (data, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["getMyInfo", userId] });
    },
  });
};
