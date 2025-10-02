import { SeoulAddress } from "@/types/global";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { GetMyInfoResponse } from "./useGetMyInfoQuery";

export interface PutMyInfoRequest {
  name: string;
  phone: string;
  address: SeoulAddress;
  bio: string;
}

export type PutMyInfoResponse = GetMyInfoResponse;

const putMyInfo = async ({ userId, data }: { userId: string; data: PutMyInfoRequest }): Promise<PutMyInfoResponse> => {
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
