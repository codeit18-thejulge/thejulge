import { useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { useGetShopNoticesQuery } from "@/hooks/api/notice/useGetShopNoticesQuery";

export default function Home() {
  const { data: notices } = useGetNoticesQuery({});
  const { data: shopNotices } = useGetShopNoticesQuery({ shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd" });
  console.log(notices);
  console.log(shopNotices);

  return (
    <>
      <h1>3팀 파이팅!</h1>
    </>
  );
}
