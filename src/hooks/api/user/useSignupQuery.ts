import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { SignupRequest, SignupResponse } from "@/types/user/signup";

const postSignup = async ({ email, password, type }: SignupRequest): Promise<SignupResponse> => {
  const response = await instance.post("/users", { email, password, type });
  return response.data;
};

export const useSignupQuery = () => {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {},
    onError: () => {},
  });
};
