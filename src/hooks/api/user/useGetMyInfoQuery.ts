import { User } from "@/types/user";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

const getMyInfo = async (userId: string): Promise<User> => {
  const response = await instance.get(`/users/${userId}`);
  return response.data;
};

export const useGetMyInfoQuery = (userId: string) => {
  return useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo(userId),
  });
};
