import Link from "next/link";
import { useState, useEffect } from "react";
import Post from "@/components/Post";
import { SeoulAddress } from "@/types/global";
import { RecentJobId, getRecentViewedJobs } from "@/utils/recentList";
import { getShopNoticeDetail } from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import { useQueries } from "@tanstack/react-query";

const RecentList = () => {
  const [jobIds, setJobIds] = useState<RecentJobId[]>([]);

  useEffect(() => {
    setJobIds(getRecentViewedJobs());
  }, []);

  const jobQueries = useQueries({
    queries: jobIds.map((id) => ({
      queryKey: ["getShopNoticeDetail", id.shopId, id.noticeId],
      queryFn: () =>
        getShopNoticeDetail({
          shopId: id.shopId,
          noticeId: id.noticeId,
        }),
      enabled: !!id.shopId && !!id.noticeId,
    })),
  });

  const jobs = jobQueries
    .map((q) => q.data?.item)
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="pb-80 pt-40 tablet:pt-60">
      <h2 className="mb-32 text-20 font-bold tablet:text-28">최근에 본 공고</h2>
      {jobs.length === 0 ? (
        <div className="min-h-100 text-center text-20 font-bold">최근 본 공고가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 gap-12 desktop:grid-cols-3">
          {jobs.map((job) => (
            <Link href={`/jobinfo/${job?.shop.item.id}/${job?.id}`} key={job?.id}>
              <Post
                name={job?.shop.item.name as string}
                hourlyPay={job?.hourlyPay as number}
                startsAt={job?.startsAt as string}
                workhour={job?.workhour as number}
                closed={job?.closed as boolean}
                imageUrl={job?.shop.item.imageUrl as string}
                address={job?.shop.item.address1 as SeoulAddress}
                originalHourlyPay={job?.shop.item.originalHourlyPay as number}
                id={job?.id as string}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentList;
