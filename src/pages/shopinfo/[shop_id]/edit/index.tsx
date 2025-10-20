import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import { getShopInfo, useGetShopInfoQuery } from "@/hooks/api/shop/useGetShopInfoQuery";
import { usePutShopInfoQuery } from "@/hooks/api/shop/usePutShopInfoQuery";
import RegisterForm, { FormData } from "@/pages/shopinfo/_components/RegisterForm";
import { useEffect } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/router";
import { getCookieValue } from "@/utils/getCookie";
import { checkAuthSSR } from "@/utils/checkAuth";
import { useModal } from "@/hooks/useModal";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { redirect } = checkAuthSSR(context, "employer", true);
  if (redirect) {
    return { redirect };
  }
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId") || "";
  const shopId = getCookieValue(cookie, "shopId") || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getShopInfo", shopId],
    queryFn: () => getShopInfo(shopId),
  });

  return { props: { userId, shopId, dehydratedState: dehydrate(queryClient) } };
};

const EditShopPage = ({ userId, shopId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: shopData, isPending: isGetPending } = useGetShopInfoQuery(shopId);
  const { mutate: updateShop, isPending: isPutPending } = usePutShopInfoQuery();

  const { openModal, closeModal } = useModal();

  const handleSubmit = (data: FormData) => {
    if (!data.category || !data.address1) {
      return;
    }
    updateShop(
      { shopId, data: { ...data, id: shopId, category: data.category, address1: data.address1 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getShopInfo", shopId] });
          openModal("confirm", "가게 정보 수정이 완료되었습니다.", () => router.replace(`/shopinfo/${shopId}`), {
            closeOnOverlayClick: false,
            closeOnEsc: false,
          });
        },
        onError: () => {
          openModal("confirm", "가게 정보 수정에 실패했습니다.", closeModal);
        },
      },
    );
  };

  const handleCloseClick = () => {
    openModal("action", "가게 정보 수정을 취소하시겠습니까?", () => router.push(`/shopinfo/${shopId}`));
  };

  useEffect(() => {
    if (!isGetPending && shopData) {
      const writerId = shopData.item.user.item.id;
      if (writerId !== userId) {
        router.replace("/joblist");
      }
    }
  }, [isGetPending, shopData, router, userId]);

  if (isGetPending || !shopData) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const defaultValues: FormData = {
    name: shopData.item.name,
    category: shopData.item.category,
    address1: shopData.item.address1,
    address2: shopData.item.address2,
    description: shopData.item.description,
    imageUrl: shopData.item.imageUrl,
    originalHourlyPay: shopData.item.originalHourlyPay,
  };

  return (
    <div className="bg-gray-5">
      <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
        <div className="relative">
          <IcClose
            onClick={handleCloseClick}
            className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32"
          />
          <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">가게 수정</h1>
          <RegisterForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isPending={isPutPending}
            submitLabel="수정"
          />
        </div>
      </div>
    </div>
  );
};

EditShopPage.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default EditShopPage;
