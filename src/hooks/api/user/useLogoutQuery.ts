import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

export interface LogoutResponse {
  message: string;
}

const postLogout = async (): Promise<LogoutResponse> => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

export const useLogoutQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      router.back();
    },
  });
};
