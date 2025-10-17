import { useMutation } from "@tanstack/react-query";
import { Link } from "@/types/global";
import axios from "axios";

export interface PostPresignedURLRequest {
  name: string; // "example.jpg, example.png 처럼 업로드 파일의 이름"
}

export interface PostPresignedURLResponse {
  item: {
    url: string;
  };
  links: Link[];
}

const postPresignedURL = async ({ name }: PostPresignedURLRequest): Promise<PostPresignedURLResponse> => {
  const response = await axios.post("/api/proxy/images", { name });
  return response.data;
};

export const usePostPresignedURLQuery = () => {
  return useMutation({
    mutationFn: postPresignedURL,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
