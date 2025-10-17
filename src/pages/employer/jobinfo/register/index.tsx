import { useRouter } from "next/router";
import RegisterForm, { FormData } from "../_components/RegisterForm";
import { usePostShopNoticesQuery } from "@/hooks/api/notice/usePostShopNoticesQuery";
import { useState } from "react";
import IcClose from "@/assets/svgs/ic_close.svg";
import Layout from "@/components/Layout";
import ModalWrapper, { ModalProps, ModalType, getModalContent } from "../_components/ModalContent";

// 추후 수정 예정
const testShopId = "3eca591f-ec92-4e19-8968-fd2e268e468b";

const RegisterJobinfo = () => {
  const shopId = testShopId;

  const router = useRouter();
  const { mutate: postShopNotice, isPending } = usePostShopNoticesQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    message: "",
    buttons: [],
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

  const handleSubmit = (data: FormData) => {
    postShopNotice(
      { shopId, data },
      {
        onSuccess: () => {
          // 공고 상세로 이동
          handleOpenModal("confirm", "공고 등록이 완료되었습니다.", () => router.replace(`/jobinfo`));
        },
        onError: () => {
          // 가게 정보 상세로 이동
          handleOpenModal("confirm", "공고 등록에 실패했습니다.", () => router.push(`/shopinfo`));
        },
      },
    );
  };

  const handleCloseClick = () => {
    // 가게 정보 상세로 이동
    handleOpenModal("action", "공고 등록을 취소하시겠습니까?", () => router.push(`/shopinfo`));
  };

  return (
    <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
      <div className="relative">
        <IcClose onClick={handleCloseClick} className="absolute right-0 top-0 w-24 hover:cursor-pointer tablet:w-32" />
        <h1 className="mb-32 text-20-bold text-black tablet:text-28-bold">공고 등록</h1>
        <RegisterForm onSubmit={handleSubmit} isPending={isPending} submitLabel="등록" />
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

export default RegisterJobinfo;
RegisterJobinfo.getLayout = (page: React.ReactNode) => {
  <Layout>{page}</Layout>;
};
