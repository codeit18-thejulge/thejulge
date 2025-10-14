import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { Link } from "@/types/global";

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
  const response = await instance.post("/images", { name });
  return response.data;
};

export const usePostPresignedURLQuery = () => {
  return useMutation({
    mutationFn: postPresignedURL,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
