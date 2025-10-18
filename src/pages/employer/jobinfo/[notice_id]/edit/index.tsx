import { useRouter } from "next/router";
import RegisterForm, { FormData } from "@/pages/employer/jobinfo/_components/RegisterForm";
import { usePutShopNoticeDetailQuery } from "@/hooks/api/notice/usePutShopNoticeDetail";
import { getShopNoticeDetail, useGetShopNoticeDetailQuery } from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import { useState } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalWrapper, { ModalProps, ModalType, getModalContent } from "@/components/ModalWrapper";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getCookieValue } from "@/utils/getCookie";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId") || "";
  const shopId = getCookieValue(cookie, "shopId") || "";
  const noticeId = context.params?.notice_id as string;

  if (!userId) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getShopNoticeDetail", shopId, noticeId],
    queryFn: () => getShopNoticeDetail({ shopId, noticeId }),
  });

  return {
    props: {
      shopId,
      noticeId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const EditJobInfo = ({ shopId, noticeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: jobinfoData, isPending: isGetLoading } = useGetShopNoticeDetailQuery({ shopId, noticeId });
  const { mutate: putShopNotice, isPending: isPutPending } = usePutShopNoticeDetailQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    message: "",
    buttons: [{ buttonText: "", style: "filled", onClick: () => {}, className: "" }],
  });

  const handleOpenModal = (type: ModalType, message: string, onConfirm: () => void) => {
    const content = getModalContent({
      type,
      message,
      onConfirm,
      onClose: () => setIsModalOpen(false),
    });
    setModalData(content);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData: FormData) => {
    putShopNotice(
      { shopId, noticeId, data: formData },
      {
        onSuccess: () => {
          handleOpenModal("confirm", "공고 수정이 완료되었습니다.", () =>
            router.replace(`/employer/jobinfo/${noticeId}`),
          );
        },
        onError: () => {
          handleOpenModal("confirm", "공고 수정에 실패했습니다.", () => {});
        },
      },
    );
  };

  const handleCloseClick = () => {
    handleOpenModal("action", "수정을 취소하시겠습니까?", () => router.push(`/employer/jobinfo/${noticeId}`));
  };

  if (isGetLoading || !jobinfoData) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const defaultValues: FormData = {
    hourlyPay: jobinfoData.item.hourlyPay,
    startsAt: jobinfoData.item.startsAt,
    workhour: jobinfoData.item.workhour,
    description: jobinfoData.item.description,
  };

  return (
    <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
      <div className="relative">
        <IcClose onClick={handleCloseClick} className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32" />
        <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">공고 수정</h1>
        <RegisterForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isPending={isPutPending}
          submitLabel="수정"
        />
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

export { getServerSideProps };
export default EditJobInfo;

EditJobInfo.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
