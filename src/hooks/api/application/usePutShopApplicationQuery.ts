import { useMutation } from "@tanstack/react-query";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import axios from "axios";

export interface PutShopApplicationRequest {
  shopId: string;
  noticeId: string;
  applicationId: string;
  data: {
    status: "accepted" | "rejected" | "canceled";
  };
}

export interface PutShopApplicationResponse {
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

const putShopApplication = async ({
  shopId,
  noticeId,
  applicationId,
  data,
}: PutShopApplicationRequest): Promise<PutShopApplicationResponse> => {
  const response = await axios.put(
    `/api/proxy/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    data,
  );
  return response.data;
};

export const usePutShopApplicationQuery = (options?: {
  onMutate?: () => void;
  onSuccess?: (data: PutShopApplicationResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: putShopApplication,
    onMutate: options?.onMutate,
    onSuccess: (res) => {
      console.log(res);
      options?.onSuccess?.(res);
    },
    onError: (err) => {
      console.error(err);
      options?.onError?.(err);
    },
  });
};
