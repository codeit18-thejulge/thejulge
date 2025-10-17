import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import ListPagination from "@/components/ListPagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import SelectBox from "@/components/SelectBox";
import { SORT_OPTIONS } from "@/constants/SORT_OPTIONS";
import { getNoticesRequest, useGetNoticesQuery } from "@/hooks/api/notice/useGetNoticesQuery";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { NoticeSort, SeoulAddress } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCookieValue } from "@/utils/getCookie";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const cookie =context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId");
  
  const queryClient = new QueryClient();
  if(userId) {
    await queryClient.prefetchQuery({
      queryKey: ["getMyInfo", userId],
      queryFn: () => getMyInfo(userId),
    });
  }
 
  return {
    props: {
      userId: userId || null,
      dehydrateState:dehydrate(queryClient),
    }
  }
}

const JobList = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [sort, setSort] = useState<NoticeSort>('time');
  const [openFilter, setOpenFilter] = useState(false);
  const [filterConditions, setFilterConditions] = useState<getNoticesRequest>({});
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page -1) * limit;  
  const activePage = page

  //검색 기능 헤더에서 만들어주면 바꿀 예정
  const keyword = Array.isArray(router.query.keyword) 
    ? router.query.keyword[0]
    : router.query.keyword || ""; 
    
  const {data: jobData, isLoading, isError} = useGetNoticesQuery({offset, limit, sort, keyword, ...filterConditions});
  const hasJobData = jobData?.items && jobData.items.length > 0;
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

  const handleApplyFilter = (newFilters: getNoticesRequest) => {
    setFilterConditions(newFilters);
    setPage(1);
  };

  useEffect(() => {
    if(isLoading) {
      const timeOut = setTimeout(() => {
        window.alert("네트워크 환경을 확인해 주세요.")
        router.push("/")
      }, 20000);
      return () => clearTimeout(timeOut);
    }
  },[isLoading, router])

  if (isLoading) {return <LoadingSpinner />;}
  if(isError) { return <div>공고를 불러오는 중에 오류가 발생했습니다.</div>}
  if (!jobData) {return <div>텅;; 아직 올라온 공고가 없습니다.</div>}
  
  return (

    <div>
      {keyword && keyword.trim() !== "" ? null : 
       (
        <div className="bg-red-10">
          <div className="mobile:max-w-350 tablet:max-w-678 desktop:max-w-964 mx-auto pl-12 tablet:pl-0">
            <h1 className="text-20 font-bold tablet:text-28 pt-60">맞춤 공고</h1>
            {userId 
            ? <div className="flex gap-4 tablet:gap-10 pb-60 pt-31 overflow-x-scroll">
              {recommendData?.items.map((data) => (
                <div key={data.item.id} className="flex-shrink-0">
                  <Link href={`/jobinfo/${data.item.shop.item.id}/${data.item.id}`}>
                    <Post
                    {...data.item}
                    {...data.item.shop.item}
                    address={data.item.shop.item.address1 as SeoulAddress}
                    className="tablet:w-312 tablet:h-348"
                    />
                  </Link>
                </div>
              ))}
            </div>
            : <div className="flex justify-center pb-100 pt-40">
                <p className="font-bold text-14 tablet:text-20">로그인하고 맞춤 공고를 확인해보세요!</p>
              </div>
            }
            
          </div>
        </div>
        )
      }
      {hasJobData
      ?
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
              <button className="bg-red-30 flex-shrink-0 px-12 py-6 rounded-5 text-16 text-white font-bold h-40" onClick={handleFilterToggle}>상세 필터</button>
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
                href={`/jobinfo/${data.item.shop.item.id}/${data.item.id}`}
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
      :
      <div className="mobile:max-w-350 tablet:max-w-678 desktop:max-w-964 mx-auto pl-12 tablet:pl-0 mt-40"> 
        <div className="flex justify-between">
          <h2 className="text-20 font-bold tablet:text-28">전체 공고</h2>
          <div className="flex gap-10 relative">
            <SelectBox 
              options={SORT_OPTIONS} 
              placeholder={SORT_OPTIONS.find(option => option.value === sort)?.label} 
              className="bg-gray-10 border-none text-14 px-12 py-8 font-bold min-w-114" 
              dropdownClassname="border-gray-10" 
              onChange={(option) => setSort(option.value as NoticeSort)}
            />
            <button className="bg-red-30 flex-shrink-0 px-12 py-6 rounded-5 text-16 text-white font-bold h-40" onClick={handleFilterToggle}>상세 필터</button>
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
      
        <div className="flex justify-center mt-100">
          <p className="font-bold text-14 tablet:text-20">조건에 맞는 공고가 없습니다.</p>
        </div>
      </div>
      }
      
      <div className="mb-80 tablet:mb-60">
        <ListPagination limit={limit} count={jobData?.count ?? 0} activePage={activePage} hasNext={jobData?.hasNext ?? false} onPageChange={(pageNumber) => setPage(pageNumber)}/>
      </div>
    </div>
  );
};

export default JobList;
JobList.getLayout  = (page: React.ReactNode) => <Layout>{page}</Layout>
    