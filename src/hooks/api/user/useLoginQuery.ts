import { UserInfoItem, UserItem, UserType } from "@/types/global";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: UserItem & UserInfoItem;
      href: string;
    };
  };
  links: [];
}

const postLogin = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post("/token", { email, password });
  return response.data;
};

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.item.token);
      localStorage.setItem("userId", res.item.user.item.id); 
    },
    onError: () => {},
  });
};
