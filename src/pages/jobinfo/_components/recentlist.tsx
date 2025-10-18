import Link from "next/link";
import { useState, useEffect } from "react";
import Post from "@/components/Post";
import { RecentJob, getRecentViewedJobs } from "@/utils/recentList";

const RecentList = () => {
  const [jobs, setJobs] = useState<RecentJob[]>([]);

  useEffect(() => {
    setJobs(getRecentViewedJobs());
  }, []);

  return (
    <div className="pb-80 pt-40 tablet:pt-60">
      <h2 className="mb-32 text-20 font-bold tablet:text-28">최근에 본 공고</h2>
      <div className="grid grid-cols-2 gap-12 desktop:grid-cols-3">
        {jobs.map((job) => (
          <Link href={`/jobinfo/${job.shopId}/${job.id}`}>
            <Post
              name={job.name}
              hourlyPay={job.hourlyPay}
              startsAt={job.startsAt}
              workhour={job.workhour}
              closed={job.closed}
              imageUrl={job.imageUrl}
              address={job.address}
              originalHourlyPay={job.originalHourlyPay}
              id={`${job.shopId}/${job.id}`}
              key={job.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentList;
