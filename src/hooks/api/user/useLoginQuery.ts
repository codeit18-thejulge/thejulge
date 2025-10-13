import { useRouter } from "next/router";
import { UserInfoItem, UserItem } from "@/types/global";
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
  const router = useRouter();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.item.token);
      router.replace("/"); //공고리스트 제작 후 수정 필요
    },
    onError: () => {},
  });
  return { mutate, isError, isPending, error };
};
