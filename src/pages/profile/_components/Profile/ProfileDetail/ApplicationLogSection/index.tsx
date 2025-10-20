import ListPagination from "@/components/ListPagination";
import Table from "@/components/Table";
import { GetUserApplicationsResponse } from "@/hooks/api/application/useGetUserApplicationsQuery";

interface Props {
  items: GetUserApplicationsResponse["items"];
  limit: number;
  count: number;
  hasNext: boolean;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
  handleApplicationClick: (shopId: string, jobId: string) => void;
}

const ApplicationLogSection = ({
  items,
  limit,
  count,
  hasNext,
  activePage,
  onPageChange,
  handleApplicationClick,
}: Props) => {
  return (
    <div className="mx-auto my-60 flex max-w-5xl flex-col gap-12 px-24">
      <h2 className="flex-[1] text-20-bold tablet:text-28-bold">신청내역</h2>
      <div className="tableOver min-h-420">
        <Table userType="employee" res={items} handleApplicationClick={handleApplicationClick} />
      </div>
      <div>
        <ListPagination
          limit={limit}
          count={count}
          hasNext={hasNext}
          activePage={activePage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ApplicationLogSection;
