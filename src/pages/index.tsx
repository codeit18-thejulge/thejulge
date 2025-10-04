import Post from "@/components/Post";

export default function Home() {
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <div className="gap-20">
        <Post
          name="진주회관"
          id="0d5dd6f0-5306-4060-8e92-11eff1e36bed"
          hourlyPay={15000}
          startsAt="2023-09-14T18:00:00.000Z"
          workhour={4}
          description="테스트"
          address="서울시 광진구"
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        />
        <Post
          name="진주회관"
          id="0d5dd6f0-5306-4060-8e92-11eff1e36bed"
          hourlyPay={15000}
          startsAt="2023-09-14T18:00:00.000Z"
          workhour={4}
          description="테스트"
          address="서울시 광진구"
          closed={true}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        />
        <Post
          name="진주회관"
          id="0d5dd6f0-5306-4060-8e92-11eff1e36bed"
          hourlyPay={15000}
          startsAt="2023-09-14T18:00:00.000Z"
          workhour={4}
          description="테스트"
          address="서울시 광진구"
          closed={true}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
        />
      </div>
    </>
  );
}
