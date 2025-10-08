import { useGetShopApplicationsQuery } from "@/hooks/api/application/useGetShopApplicationsQuery";
import { usePostShopApplicationQuery } from "@/hooks/api/application/usePostShopApplicationQuery";
import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";

export default function Home() {
  const { data: getShopNoticeApplications } = useGetShopApplicationsQuery({
    shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd",
    noticeId: "fc0aad52-832b-4388-8a8e-129d5160a6b3",
  });
  const { mutate: postShopApplication } = usePostShopApplicationQuery();
  const { mutate: postLogin } = useLoginQuery();
  const tt = () => {
    postShopApplication({
      shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd",
      noticeId: "fc0aad52-832b-4388-8a8e-129d5160a6b3",
    });
  };

  const ll = () => {
    postLogin({ email: "test@a.com", password: "1" });
  };
  console.log("dd", getShopNoticeApplications);
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={ll}>로</button>
      <button onClick={tt}>지원</button>
    </>
  );
}
