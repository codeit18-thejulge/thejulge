import { CardImageBox } from "@/components/ShopInfo";
import { getShopNotices, useGetShopNoticesQuery } from "@/hooks/api/notice/useGetShopNoticesQuery";
import { getShopInfo, useGetShopInfoQuery } from "@/hooks/api/shop/useGetShopInfoQuery";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps() {
  
  const shopId = "98021ea4-1504-4c48-b61e-e7c0e5ee67c6";//임시 shopId
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
  

  return (
      <div>
   
      </div>
  );
};

export default ShopInfo;