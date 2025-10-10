import ShopInfoCard from "@/components/ShopInfo/ShopInfoCard";
import ShopNoticeCard from "@/components/ShopInfo/ShopNoticeCard";

const desc = `알바하기 편한 너구리네 라면집!
라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
글자 제한을 해도 
줄바끔 하면 길어져서 
스크롤이 필요할까요
`;
export default function Home() {
  return (
    <>
      <h1>3팀 파이팅!</h1>

      <ShopInfoCard
        category={"식당"}
        name={"진주회관"}
        description={desc}
        address={"서울시 중구"}
        imageUrl={
          "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        }
        bgColor={"bg-red-10"}
      />
      <ShopNoticeCard
        userType={"employer"}
        category={"시급"}
        description={desc}
        address={"서울시 중구"}
        hourlyPay={15000}
        originalHourlyPay={10000}
        startsAt={"2025-09-28T22:00:00Z"}
        imageUrl={
          "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        }
        closed={false}
        workHour={3}
      />
    </>
  );
}
