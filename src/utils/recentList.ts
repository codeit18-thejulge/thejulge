const STORAGE_KEY = "recentViewedJobs";
const MAX_ITEMS = 6;

export interface RecentJobId {
  noticeId: string;
  shopId: string;
  viewedAt?: Date;
}

export function getRecentViewedJobs(): RecentJobId[] {
  if (typeof window === "undefined") {
    return [];
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addRecentViewedJob(job: Omit<RecentJobId, "viewedAt">) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getRecentViewedJobs();
  const filtered = existing.filter((j) => j.noticeId !== job.noticeId);
  const updated = [{ ...job, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
