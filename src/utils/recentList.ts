import { NoticeItem, SeoulAddress } from "@/types/global";

const STORAGE_KEY = "recentViewedJobs";
const MAX_ITEMS = 6;

export interface RecentJob extends Omit<NoticeItem, "description"> {
  name: string;
  imageUrl: string;
  address: SeoulAddress;
  originalHourlyPay: number;
  className?: string;
  viewedAt?: Date;
  shopId?: string;
}

export function getRecentViewedJobs(): RecentJob[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addRecentViewedJob(job: Omit<RecentJob, "viewedAt">) {
  if (typeof window === "undefined") return;

  const existing = getRecentViewedJobs();
  const filtered = existing.filter((p) => p.id !== job.id);
  const updated = [{ ...job, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
