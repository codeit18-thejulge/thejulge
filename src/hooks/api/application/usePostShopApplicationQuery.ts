import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import axios from "axios";

export interface PostShopApplicationRequest {
  shopId: string;
  noticeId: string;
}

export interface PostShopApplicationResponse {
  item: ApplicationItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
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
  };
  links: Link[];
}

const postShopApplication = async ({
  shopId,
  noticeId,
}: PostShopApplicationRequest): Promise<PostShopApplicationResponse> => {
  const response = await axios.post(`/api/proxy/shops/${shopId}/notices/${noticeId}/applications`);
  return response.data;
};

export const usePostShopApplicationQuery = (options?: {
  onMutate?: () => void;
  onSuccess?: (data: PostShopApplicationResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postShopApplication,
    onMutate: options?.onMutate,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getUserApplications"] });
      options?.onSuccess?.(res);
    },
    onError: (err) => {
      console.error(err);
      options?.onError?.(err);
    },
  });
};
