import Post from "@/components/Post";

export default function Home() {
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <Post
        id="4490151c-5217-4157-b072-9c37b05bed47"
        name="진주회관"
        hourlyPay={15000}
        address="서울시 중구"
        originalHourlyPay={10000}
        imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        startsAt="2023-07-07T18:00:00.000Z"
        closed={false}
        workhour={3}
      />
    </>
  );
}
