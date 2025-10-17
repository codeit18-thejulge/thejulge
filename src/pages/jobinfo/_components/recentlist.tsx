import Post from "@/components/Post";

const RecentList = () => {
  return (
    <div className="pb-80 pt-40 tablet:pt-60">
      <h2 className="mb-32 text-20 font-bold tablet:text-28">최근에 본 공고</h2>
      <div className="grid grid-cols-2 gap-12 desktop:grid-cols-3">
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
          className=""
        />
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
        />
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
        />
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
        />
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
        />
        <Post
          name="test"
          id="123"
          hourlyPay={13000}
          startsAt="2025-10-10 19:00:00"
          workhour={3}
          closed={false}
          imageUrl="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d3fdf139-8b17-46ac-8e72-9ceb9893ae68-xef.jpeg"
          address="서울시 관악구"
          originalHourlyPay={10100}
        />
      </div>
    </div>
  );
};

export default RecentList;
