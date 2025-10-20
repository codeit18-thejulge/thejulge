import { useRouter } from "next/router";
import RegisterForm, { FormData } from "../_components/RegisterForm";
import { usePostShopNoticesQuery } from "@/hooks/api/notice/usePostShopNoticesQuery";
import { useEffect, useState } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import { getCookieValue } from "@/utils/getCookie";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useModal } from "@/hooks/useModal";

const RegisterJobinfo = () => {
  useCheckAuth("employer", true);

  const [shopId, setShopId] = useState("");

  useEffect(() => {
    const shopCookieId = getCookieValue(document.cookie, "shopId") || "";
    setShopId(shopCookieId);
  }, []);

  const router = useRouter();
  const { mutate: postShopNotice, isPending } = usePostShopNoticesQuery();

  const { openModal, closeModal } = useModal();

  const handleSubmit = (data: FormData) => {
    postShopNotice(
      { shopId, data },
      {
        onSuccess: (res) => {
          const notice_id = res.item.id;
          openModal("confirm", "공고 등록이 완료되었습니다.", () => router.replace(`/employer/jobinfo/${notice_id}`), {
            closeOnOverlayClick: false,
            closeOnEsc: false,
          });
        },
        onError: () => {
          openModal("confirm", "공고 등록에 실패했습니다.", closeModal);
        },
      },
    );
  };

  const handleCloseClick = () => {
    openModal("action", "공고 등록을 취소하시겠습니까?", () => router.push(`/shopinfo/${shopId}`));
  };

  return (
    <div className="bg-gray-5">
      <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
        <div className="relative">
          <IcClose
            onClick={handleCloseClick}
            className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32"
          />
          <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">공고 등록</h1>
          <RegisterForm onSubmit={handleSubmit} isPending={isPending} submitLabel="등록" />
        </div>
      </div>
    </div>
  );
};

export default RegisterJobinfo;
RegisterJobinfo.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
