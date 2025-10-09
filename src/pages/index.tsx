import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";

export default function Home() {
  const { mutate: postLogin } = useLoginQuery();
  const ll = () => {
    postLogin({ email: "a@a.com", password: "1" });
  };
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={ll}>로그인</button>
    </>
  );
}
