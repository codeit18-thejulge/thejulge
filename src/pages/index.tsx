import { useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { useGetShopNoticesQuery } from "@/hooks/api/notice/useGetShopNoticesQuery";
import { usePostShopNoticesQuery } from "@/hooks/api/notice/usePostShopNoticesQuery";
import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";

export default function Home() {
  const { mutate: postLogin } = useLoginQuery();
  const { data: notices } = useGetNoticesQuery({});
  const { data: shopNotices } = useGetShopNoticesQuery({ shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd" });
  const { mutate: postShopNotices } = usePostShopNoticesQuery();
  // console.log(notices);
  // console.log(shopNotices);

  const tt = () => {
    postShopNotices({
      shopId: "9e39dfd0-c684-443b-8727-c1d1a47344bd",
      hourlyPay: 12000,
      startsAt: "2025-12-23T00:00:00Z",
      workhour: 3,
      description: "정상인",
    });
  };

  const login = () => {
    postLogin({ email: "test@a.com", password: "1" });
  };
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={login}>로그인</button>
      <button onClick={tt}>클릭</button>
    </>
  );
}
