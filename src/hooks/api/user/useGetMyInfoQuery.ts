import { Link, UserType } from "@/types/global";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

export interface GetMyInfoResponse {
  item: {
    id: string;
    email: string;
    type: UserType;
    name: string;
    phone: string;
    address: string;
    bio: string;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
    } | null;
  };
  links: Link[];
}

const getMyInfo = async (userId: string): Promise<GetMyInfoResponse> => {
  const response = await instance.get(`/users/${userId}`);
  return response.data;
};

export const useGetMyInfoQuery = (userId: string) => {
  return useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo(userId),
  });
};
