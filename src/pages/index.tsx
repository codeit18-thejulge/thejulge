import { useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";

export default function Home() {
  const { data: notices } = useGetNoticesQuery({});

  console.log(notices);
  return (
    <>
      <h1>3팀 파이팅!</h1>
    </>
  );
}
