import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { CardAddress, CardCategory, CardDescription, CardImageBox, CardTitle } from "@/components/ShopInfo";
import { getShopNotices, useGetShopNoticesQuery } from "@/hooks/api/notice/useGetShopNoticesQuery";
import { getShopInfo, useGetShopInfoQuery } from "@/hooks/api/shop/useGetShopInfoQuery";
import { SeoulAddress } from "@/types/global";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps() {
  
  const shopId = "365c6cd0-883e-4b90-9fff-8bf0dae08815";//임시 shopId
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey:["getShopInfo", shopId],
      queryFn: () => getShopInfo(shopId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["getShopNotices", shopId, 0, 6],
      queryFn: () => getShopNotices({shopId, offset: 0, limit: 6}),
    })
  ])
  return {
    props: {
      shopId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ShopInfo = ({shopId}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const {data: shopInfo} = useGetShopInfoQuery(shopId);
  const {data: shopNotices} = useGetShopNoticesQuery({shopId, offset: 0, limit: 6});
  const hasShopNotices = shopNotices && shopNotices?.items.length > 0;
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
              <Button className="h-38" status="filled">편집하기</Button>
              <Button className="h-38" status="lined">공고 등록하기</Button>
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
              {shopNotices.items.map((notice) => (
                <Post
                  key={notice.item.id}
                  {...notice.item}
                  imageUrl={shopInfo?.item.imageUrl ?? ""}
                  name={shopInfo?.item.name ?? ""}
                  address={shopInfo?.item.address1 as SeoulAddress}
                  originalHourlyPay={shopInfo?.item.originalHourlyPay as number}
                />
              ))}
            </div>
          </div>
        </div>
      :
        <div className="bg-gray-5">
          <div className="max-w-351 tablet:max-w-680 desktop:max-w-964 mx-auto py-80 tablet:py-120">
            <div className="flex flex-col justify-center items-center border h-195 bg-transparent rounded-12">
              <span>공고를 등록해보세요</span>
              <Button className="w-108 h-37 tablet:w-346 tablet:h-47" status="filled">공고 등록하기</Button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ShopInfo;
ShopInfo.getLayout  = (page: React.ReactNode) => <Layout>{page}</Layout>