import Button from "@/components/Button";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import { CardAddress, CardCategory, CardDescription, CardImageBox, CardTitle } from "@/components/ShopInfo";
import { useGetShopNoticesInfiniteQuery } from "@/hooks/api/notice/useGetShopNoticesInfiniteQuery";
import { getShopNotices } from "@/hooks/api/notice/useGetShopNoticesQuery";
import { getShopInfo, useGetShopInfoQuery } from "@/hooks/api/shop/useGetShopInfoQuery";
import { SeoulAddress } from "@/types/global";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"
;import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookieValue } from "@/utils/getCookie";

export async function getServerSideProps(context:GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId");
  const shopId = getCookieValue(cookie, "shopId")
  if(!userId) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      }
    }
  }

  if(!shopId) {
    return {
      redirect: {
        destination: "/shopinfo",
        permanent: false,
      }
    }
  }

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey:["getShopInfo", shopId],
      queryFn: () => getShopInfo(shopId),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["getShopNotices", shopId], 
      queryFn: () => getShopNotices({ shopId, offset: 0, limit: 6 }),
      initialPageParam: 0,
    }),
  ])

  return {
    props: {
      shopId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ShopInfoDetail = ({shopId}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {data: shopInfo, isLoading: shopInfoLoading} = useGetShopInfoQuery(shopId);
  const { 
    data: shopNotices, 
    fetchNextPage,
    hasNextPage,  
    isFetchingNextPage, 
  } = useGetShopNoticesInfiniteQuery({ shopId, limit: 6 });
  
  const { ref, inView } = useInView({
    threshold: 0, 
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  const hasShopNotices = shopNotices && shopNotices.pages[0].items.length > 0;

  const handleEditClick = () => {
    router.push(`/shopinfo/${shopId}/edit`);
  }

  const handleRegisterClick = () => {
    router.push('/employer/jobinfo/register')
  }

  if(shopInfoLoading) {
    return <div><LoadingSpinner/></div>
  }


  return (
    <div>
      <div className="flex gap-16 tablet:gap-24 flex-col max-w-351 tablet:max-w-680 desktop:max-w-964 mx-auto my-40 tablet:my-60">
        <h1 className="text-20 font-bold tablet:text-28">내가게</h1>
        <div className="flex flex-col desktop:flex-row bg-red-10 rounded-12 p-20 tablet:p-24 desktop:gap-31">
          <CardImageBox 
            imageUrl={shopInfo?.item.imageUrl ?? ""}
            startsAt={""}
            name="가게"
            closed={false}
            className="desktop:h-308"
          />
          <div className="flex flex-col justify-between gap-24 tablet:gap-40 desktop:w-346"> 
            <div className="flex flex-col gap-8">
              <CardCategory category={shopInfo?.item.category ?? ""}/>
              <CardTitle name={shopInfo?.item.name ?? ""}/>
              <CardAddress address={shopInfo?.item.address1 ?? ""}/>
              <CardDescription description={shopInfo?.item.description}/>
            </div>
            <div className="flex gap-8">
              <Button onClick={handleEditClick}className="h-38" status="filled">편집하기</Button>
              <Button onClick={handleRegisterClick} className="h-38" status="lined">공고 등록하기</Button>
            </div>
          </div>
        </div>
      </div>
      { hasShopNotices 
      ? 
        <div className="bg-gray-5">
          <div className="flex flex-col gap-16 tablet:gap-32 mobile:max-w-375 tablet:max-w-678 desktop:max-w-964 mx-auto px-12 tablet:px-0 pb-80 tablet:pb-120">
            <h1 className="text-20 font-bold tablet:text-28 pt-40 tablet:pt-60">내가 등록한 공고</h1>
            <div className="grid grid-cols-2 gap-8 desktop:grid-cols-3 desktop:gap-14">     
              {shopNotices.pages.flatMap((page) => 
                page.items.map((notice) => (
                <Link 
                  key={notice.item.id}
                  href='/employer/jobinfo'
                >
                  <Post
                    {...notice.item}
                    imageUrl={shopInfo?.item.imageUrl ?? ""}
                    name={shopInfo?.item.name ?? ""}
                    address={shopInfo?.item.address1 as SeoulAddress}
                    originalHourlyPay={shopInfo?.item.originalHourlyPay as number}
                  />
                 </Link> 
                )))}
            </div>
            {hasNextPage && <div ref={ref} />}
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </div>
      :
        <div className="bg-gray-5">
          <div className="max-w-351 tablet:max-w-680 desktop:max-w-964 mx-auto py-80 tablet:py-120">
            <div className="flex flex-col gap-24 justify-center items-center border h-195 bg-transparent rounded-12">
              <span>공고를 등록해보세요</span>
              <Button onClick={handleRegisterClick} className="w-108 h-37 tablet:w-346 tablet:h-47" status="filled">공고 등록하기</Button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ShopInfoDetail;
ShopInfoDetail.getLayout  = (page: React.ReactNode) => <Layout>{page}</Layout>