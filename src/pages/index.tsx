import { useGetShopApplicationsQuery } from "@/hooks/api/application/useGetShopApplicationsQuery";

export default function Home() {
  const { data: getShopNoticeApplications } = useGetShopApplicationsQuery({
    shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd",
    noticeId: "fc0aad52-832b-4388-8a8e-129d5160a6b3",
  });

  console.log(getShopNoticeApplications);
  return (
    <>
      <h1>3팀 파이팅!</h1>
    </>
  );
}
