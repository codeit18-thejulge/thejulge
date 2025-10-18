import { useRouter } from "next/router";
import { UserInfoItem, UserItem } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data.data;
};

export const useLoginQuery = () => {
  const router = useRouter();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      router.replace("/joblist");
    },
    onError: () => {},
  });
  return { mutate, isError, isPending, error };
};
