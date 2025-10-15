import ListPagination from "@/components/ListPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import Table from "@/components/Table";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { useRouter } from "next/router";

interface Props {
  userId: string;
}

const ApplicationLogSection = ({ userId }: Props) => {
  const { data, isLoading, isError, error } = useGetUserApplicationsQuery({ userId });
  const router = useRouter();

  const handleApplicationClick = (jobId: string) => {
    router.push(`/jobinfo/${jobId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return isError ? <p>{error.message}</p> : <p>데이터를 불러오지 못했습니다</p>;
  }

  const { items } = data;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <h2 className="flex-[1] text-20-bold tablet:text-28-bold">신청내역</h2>
      <Table userType="employee" res={items} handleApplicationClick={handleApplicationClick} />
      <ListPagination limit={5} count={data.count} hasNext={data.hasNext} />
    </div>
  );
};

export default ApplicationLogSection;
