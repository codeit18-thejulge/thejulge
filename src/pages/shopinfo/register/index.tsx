import { useRouter } from "next/router";
import RegisterForm, { FormData } from "../_components/RegisterForm";
import { useEffect } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import { usePostShopQuery } from "@/hooks/api/shop/usePostShopQuery";
import useCheckAuth from "@/hooks/useCheckAuth";
import { getCookieValue } from "@/utils/getCookie";
import { useModal } from "@/hooks/useModal";

const RegisterJobinfo = () => {
  useCheckAuth("employer");

  const router = useRouter();
  const { mutate: postShop, isPending } = usePostShopQuery();

  const { openModal, closeModal } = useModal();

  const handleSubmit = (data: FormData) => {
    if (!data.category || !data.address1) {
      return;
    }
    postShop(
      { ...data, category: data.category, address1: data.address1 },
      {
        onSuccess: (res) => {
          const shop_id = res.item.id;
          document.cookie = `shopId=${shop_id}; Path=/;`;
          openModal("confirm", "가게 등록이 완료되었습니다.", () => router.replace(`/shopinfo/${shop_id}`), {
            closeOnOverlayClick: false,
            closeOnEsc: false,
          });
        },
        onError: () => {
          openModal("confirm", "가게 등록에 실패했습니다.", closeModal);
        },
      },
    );
  };

  const handleCloseClick = () => {
    openModal("action", "가게 등록을 취소하시겠습니까?", () => router.push(`/shopinfo`));
  };

  useEffect(() => {
    const shopId = getCookieValue(document.cookie, "shopId");
    if (shopId) {
      openModal("confirm", "이미 등록된 가게가 있습니다.", () => router.replace(`/shopinfo/${shopId}`), {
        closeOnOverlayClick: false,
        closeOnEsc: false,
      });
    }
  }, [openModal, router]);

  return (
    <div className="bg-gray-5">
      <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
        <div className="relative">
          <IcClose
            onClick={handleCloseClick}
            className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32"
          />
          <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">내 가게</h1>
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
