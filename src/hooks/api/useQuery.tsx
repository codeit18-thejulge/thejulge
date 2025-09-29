import { useQuery } from "@tanstack/react-query";

// 컴포넌트에서 다이렉트로 사용하기
// notion 예시코드 그대로 가져왔습니다.
export default function Product() {
  const { data } = useQuery({
    queryKey: ["getProduct"],
    queryFn: async () => (await fetch("https://api.example.com")).json(),
  });
  return <div>{JSON.stringify(data)}</div>;
}
