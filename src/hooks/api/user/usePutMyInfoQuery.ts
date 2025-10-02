import { PutMyInfoRequest } from "@/types/user";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/user";

const putMyInfo = async ({ userId, data }: { userId: string; data: PutMyInfoRequest }): Promise<User> => {
  const response = await instance.put(`/users/${userId}`, data);
  return response.data;
};

export const usePutMyInfoQuery = () => {
  return useMutation({
    mutationFn: putMyInfo,
    onSuccess: () => {},
    onError: () => {},
  });
};
