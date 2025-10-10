import { UserInfoItem } from "@/types/global";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { UserItem, ShopItem, Link } from "@/types/global";

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
  const response = await instance.put(`/users/${userId}`, data);
  return response.data;
};

export const usePutMyInfoQuery = () => {
  return useMutation({
    mutationFn: putMyInfo,
    onSuccess: (res) => {
      console.log(res); // 추후 모달띄우기
    },
    onError: (err) => {
      console.log(err); // 추후 에러메시지 띄우기
    },
  });
};
