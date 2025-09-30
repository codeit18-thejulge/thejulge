import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "@/types/user";

const postLogin = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post("/token", { email, password });
  return response.data;
};

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {},
    onError: () => {},
  });
};
