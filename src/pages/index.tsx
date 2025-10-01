import { usePostShopQuery } from "@/hooks/api/shop/usePostShopQuery";
import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";

export default function Home() {
  const { mutate: postLogin } = useLoginQuery();
  const { mutate: postShop } = usePostShopQuery();

  const handlePostShop = () => {
    postShop({
      name: "테스트",
      category: "한식",
      address1: "서울시 강남구",
      address2: "ww",
      description: "dwq",
      imageUrl: "wwww.com",
      originalHourlyPay: 15000,
    });
  };
  return (
    <>
      <button onClick={() => postLogin({ email: "test2@example.com", password: "1234" })}>로그인</button>
      <button onClick={handlePostShop}>가게등록</button>
      <h1>3팀 파이팅!</h1>
    </>
  );
}
