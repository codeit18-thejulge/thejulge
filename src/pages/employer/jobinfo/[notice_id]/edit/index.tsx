import { useRouter } from "next/router";
import RegisterForm, { FormData } from "@/pages/employer/jobinfo/_components/RegisterForm";
import { usePutShopNoticeDetailQuery } from "@/hooks/api/notice/usePutShopNoticeDetail";
import { getShopNoticeDetail, useGetShopNoticeDetailQuery } from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import { useEffect } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import { getCookieValue } from "@/utils/getCookie";
import { checkAuthSSR } from "@/utils/checkAuth";
import { useModal } from "@/hooks/useModal";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { redirect } = checkAuthSSR(context, "employer", true);
  if (redirect) {
    return { redirect };
  }
  const cookie = context.req.headers.cookie;
  const shopId = getCookieValue(cookie, "shopId") || "";
  const noticeId = context.params?.notice_id as string;

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
  const queryClient = useQueryClient();

  const { data: jobinfoData, isPending: isGetPending } = useGetShopNoticeDetailQuery({ shopId, noticeId });
  const { mutate: putShopNotice, isPending: isPutPending } = usePutShopNoticeDetailQuery();

  const { openModal, closeModal } = useModal();

  const handleSubmit = (formData: FormData) => {
    putShopNotice(
      { shopId, noticeId, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getShopNoticeDetail", shopId, noticeId] });
          openModal("confirm", "공고 수정이 완료되었습니다.", () => router.replace(`/employer/jobinfo/${noticeId}`), {
            closeOnOverlayClick: false,
            closeOnEsc: false,
          });
        },
        onError: () => {
          openModal("confirm", "공고 수정에 실패했습니다.", closeModal);
        },
      },
    );
  };

  const handleCloseClick = () => {
    openModal("action", "수정을 취소하시겠습니까?", () => router.push(`/employer/jobinfo/${noticeId}`));
  };

  useEffect(() => {
    if (!isGetPending && jobinfoData) {
      const writerId = jobinfoData.item.shop.item.id;
      if (writerId !== shopId) {
        router.replace("/joblist");
      }

      if (jobinfoData.item.closed) {
        openModal("confirm", "마감된 공고는 수정할 수 없습니다.", () => router.push(`/employer/jobinfo/${noticeId}`), {
          closeOnOverlayClick: false,
          closeOnEsc: false,
        });
      }
    }
  }, [isGetPending, jobinfoData, noticeId, openModal, router, shopId]);

  if (isGetPending || !jobinfoData) {
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
    <div className="bg-gray-5">
      <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
        <div className="relative">
          <IcClose
            onClick={handleCloseClick}
            className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32"
          />
          <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">공고 수정</h1>
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

export { getServerSideProps };
export default EditJobInfo;

EditJobInfo.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
