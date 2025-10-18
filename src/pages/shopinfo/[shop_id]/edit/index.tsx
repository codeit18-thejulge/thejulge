import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getShopInfo, useGetShopInfoQuery } from "@/hooks/api/shop/useGetShopInfoQuery";
import { usePutShopInfoQuery } from "@/hooks/api/shop/usePutShopInfoQuery";
import RegisterForm, { FormData } from "@/pages/shopinfo/_components/RegisterForm";
import { useState } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalWrapper, { ModalProps, ModalType, getModalContent } from "@/components/ModalWrapper";
import { useRouter } from "next/router";
import { getCookieValue } from "@/utils/getCookie";
import { checkAuthSSR } from "@/utils/checkAuth";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { redirect } = checkAuthSSR(context, "employer", true);
  if (redirect) {
    return { redirect };
  }
  const cookie = context.req.headers.cookie;
  const shopId = getCookieValue(cookie, "shopId") || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getShopInfo", shopId],
    queryFn: () => getShopInfo(shopId),
  });

  return { props: { shopId, dehydratedState: dehydrate(queryClient) } };
};

const EditShopPage = ({ shopId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: shopData, isLoading } = useGetShopInfoQuery(shopId);
  const { mutate: updateShop, isPending } = usePutShopInfoQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({ message: "", buttons: [] });

  const handleOpenModal = (type: ModalType, message: string, onConfirm: () => void) => {
    const content = getModalContent({ type, message, onConfirm, onClose: () => setIsModalOpen(false) });
    setModalData(content);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: FormData) => {
    if (!data.category || !data.address1) {
      return;
    }
    updateShop(
      { shopId, data: { ...data, id: shopId, category: data.category, address1: data.address1 } },
      {
        onSuccess: () => {
          handleOpenModal("confirm", "가게 정보 수정이 완료되었습니다.", () => router.replace(`/shopinfo/${shopId}`));
        },
        onError: () => {
          handleOpenModal("confirm", "가게 정보 수정에 실패했습니다.", () => router.push(`/shopinfo/${shopId}`));
        },
      },
    );
  };

  const handleCloseClick = () =>
    handleOpenModal("action", "가게 정보 수정을 취소하시겠습니까?", () => router.push(`/shopinfo/${shopId}`));

  if (isLoading || !shopData) {
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
    <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
      <div className="relative">
        <IcClose onClick={handleCloseClick} className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32" />
        <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">가게 수정</h1>
        <RegisterForm defaultValues={defaultValues} onSubmit={handleSubmit} isPending={isPending} submitLabel="수정" />
        <ModalWrapper
          isOpen={isModalOpen}
          message={modalData.message}
          onClose={() => setIsModalOpen(false)}
          buttons={modalData.buttons}
        />
      </div>
    </div>
  );
};

EditShopPage.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default EditShopPage;
