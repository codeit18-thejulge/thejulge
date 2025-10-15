
import Filter from "@/components/Filter";
import ListPagination from "@/components/ListPagination";
import Post from "@/components/Post";
import SelectBox from "@/components/SelectBox";
import { SORT_OPTIONS } from "@/constants/SORT_OPTIONS";
import { getNoticesRequest, useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { NoticeSort, SeoulAddress } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


const JobList = () => {
  const router = useRouter();
  const [sort, setSort] = useState<NoticeSort>('time');
  const [openFilter, setOpenFilter] = useState(false);
  const [filterConditions, setFilterConditions] = useState<getNoticesRequest>({});
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page -1) * limit;  
  const keyword = Array.isArray(router.query.keyword) 
    ? router.query.keyword[0]
    : router.query.keyword || ""; 
  const {data: jobData} = useGetNoticesQuery({offset, limit, sort, keyword, ...filterConditions});
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

  const {data: userData} = useGetMyInfoQuery(userId ?? "", {enabled: !!userId});
  const userAddress = userData?.item?.address;
  const {data: recommendData} = useGetNoticesQuery(
    {
      offset:0, 
      limit:3, 
      sort:'time', 
      address: userAddress
    }, 
    {
      enabled: !!userAddress
    }
  );



  const handleFilterToggle = () => {
    setOpenFilter((prev) => !prev);

  }
  if (!jobData) {return <div>로딩 중...</div>;}

  const handleApplyFilter = (newFilters: getNoticesRequest) => {
    setFilterConditions(newFilters);
    setPage(1);
};

  return (
    <div>
      {keyword && keyword.trim() !== "" ? null : 
       (
        <div className="bg-red-10">
          <div className="mobile:max-w-350 tablet:max-w-678 desktop:max-w-964 mx-auto pl-12 tablet:pl-0">
            <h1 className="text-28 font-bold pt-60">맞춤 공고</h1>
            <div className="flex gap-4 tablet:gap-10 pb-60 pt-31 overflow-x-scroll">
              {recommendData?.items.map((data) => (
                <div key={data.item.id} className="flex-shrink-0">
                  <Link href={`/jobinfo/${data.item.id}`}>
                    <Post
                    {...data.item}
                    {...data.item.shop.item}
                    address={data.item.shop.item.address1 as SeoulAddress}
                    className="tablet:w-312 tablet:h-348 "
                    />
                  </Link>                
                </div>
              ))}
            </div>
          </div>
        </div>
        )
      }
      <div className="mobile:max-w-375 tablet:max-w-678 desktop:max-w-964 mx-auto mt-60 mb-40 px-12 tablet:px-0">
        <div className="flex flex-col items-start gap-16 justify-start mb-16 tablet:flex-row tablet:justify-between tablet:items-center tablet:mb-40">
          {keyword && keyword.trim() !== "" ? 
            <div className="text-20 font-bold tablet:text-28">
              <h2 className="text-primary inline">{keyword}</h2>에 대한 공고 목록
            </div>
            : <h2 className="text-20 font-bold tablet:text-28">전체 공고</h2>
          }
          <div className="flex gap-10 relative">
            <SelectBox 
              options={SORT_OPTIONS} 
              placeholder={SORT_OPTIONS.find(option => option.value === sort)?.label} 
              className="bg-gray-10 border-none text-14 px-12 py-8 font-bold min-w-114" 
              dropdownClassname="border-gray-10" 
              onChange={(option) => setSort(option.value as NoticeSort)}
            />
            <button className="bg-red-30 flex-shrink-0 px-12 py-6 rounded-5 text-16 text-white font-bold" onClick={handleFilterToggle}>상세 필터</button>
            {openFilter && 
              <div className="absolute top-50 right--1 tablet:right-0 z-50">
                <Filter 
                  isOpen={openFilter} 
                  onClose={() => setOpenFilter(false)} 
                  closeOnEsc={true} 
                  className={"bg-white"} 
                  onApply={handleApplyFilter}
                />
              </div>
            }
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 desktop:grid-cols-3 desktop:gap-14">      
          {jobData?.items.map((data)=>(
            <Link 
              key={data.item.id}
              href={`/jobinfo/${data.item.id}`}
            >
              <Post 
                {...data.item}
                {...data.item.shop.item}
                address={data.item.shop.item.address1 as SeoulAddress}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-80 tablet:mb-60">
        <ListPagination limit={limit} count={jobData?.count ?? 0} hasNext={jobData?.hasNext ?? false} onPageChange={(pageNumber) => setPage(pageNumber)}/>
      </div>
    </div>
  );
};

export default JobList;
    