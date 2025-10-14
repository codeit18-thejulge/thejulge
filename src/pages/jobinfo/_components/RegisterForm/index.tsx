import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import IcClose from "@/assets/svgs/ic_close.svg";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePostShopNoticesQuery } from "@/hooks/api/notice/usePostShopNoticesQuery";
import MessageModal from "@/components/Modal/MessageModal";
import { useRouter } from "next/router";
import { getModalContent, ModalType, ModalProps } from "@/utils/registerModalContent";

const MINIMUM_WAGE = 10030;
const labelStyle = "flex flex-col gap-8 flex-1 text-16-regular text-black";
const labelRequiredStyle = "after:content-['*'] after:text-primary";

const RegisterForm = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  const { mutate: postShopNotice, isPending } = usePostShopNoticesQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    message: "",
    buttons: [{ buttonText: "", style: "filled", onClick: () => {}, className: "" }],
  });
  const [formData, setFormData] = useState({
    hourlyPay: MINIMUM_WAGE,
    startsAt: dayjs().format("YYYY-MM-DDTHH:mm"),
    workhour: 1,
    description: "",
  });
  const [displayPay, setDisplayPay] = useState(formData.hourlyPay.toLocaleString());
  const [errMSg, setErrMsg] = useState({ hourlyPay: "", startsAt: "", workhour: "" });

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payInput = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(payInput)) {
      const num = payInput === "" ? 0 : Number(payInput);
      setFormData((prev) => ({ ...prev, hourlyPay: num }));
      setDisplayPay(payInput);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleBlur = (input: string) => {
    let message = "";
    if (input === "hourlyPay" && formData.hourlyPay < MINIMUM_WAGE) {
      message = `시급은 최소 ${MINIMUM_WAGE.toLocaleString()}원 이상이어야 합니다.`;
    } else if (input === "startsAt" && dayjs(formData.startsAt).isBefore(dayjs())) {
      message = "시작 일시는 현재 시각 이후여야 합니다.";
    } else if (input === "workhour" && (formData.workhour < 1 || formData.workhour > 24)) {
      message = "업무 시간은 1~24시간 사이여야 합니다.";
    }
    setErrMsg((prev) => ({ ...prev, [input]: message }));

    if (input === "hourlyPay") {
      setDisplayPay(formData.hourlyPay.toLocaleString("ko-KR"));
    }
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postShopNotice(
      {
        shopId,
        data: {
          hourlyPay: formData.hourlyPay,
          startsAt: dayjs(formData.startsAt).toISOString(),
          workhour: formData.workhour,
          description: formData.description,
        },
      },
      {
        onSuccess: () => {
          // 공고 상세로 이동
          handleOpenModal("confirm", "공고 등록이 완료되었습니다.", () => router.replace(`/`));
        },
        onError: () => {
          // 가게 정보 상세로 이동
          handleOpenModal("confirm", "공고 등록에 실패했습니다.", () => router.push(`/`));
        },
      },
    );
  };
  const handleCloseClick = () => {
    // 가게 정보 상세로 이동
    handleOpenModal("action", "공고 등록을 취소하시겠습니까?", () => router.push(`/`));
  };

  const hasError = Object.values(errMSg).some((msg) => msg);

  return (
    <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
      <div className="relative">
        <IcClose onClick={handleCloseClick} className="absolute right-0 top-0 w-24 tablet:w-32" />
        <form className="flex flex-col gap-32" onSubmit={handleSubmit}>
          <h1 className="text-20-bold text-black tablet:text-28-bold">공고 등록</h1>
          <div className="grid grid-cols-1 gap-20 tablet:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <label className={cn(labelStyle)}>
              <span className={cn(labelRequiredStyle)}>시급</span>
              <Input
                name="hourlyPay"
                type="text"
                value={displayPay}
                onChange={handlePayChange}
                onBlur={() => handleBlur("hourlyPay")}
                errorMsg={errMSg.hourlyPay}
                isUnit="원"
                required
              />
            </label>
            <label className={cn(labelStyle)}>
              <span className={cn(labelRequiredStyle)}>시작 일시</span>
              <Input
                name="startsAt"
                type="datetime-local"
                min={formData.startsAt}
                value={formData.startsAt}
                onChange={handleInputChange}
                onBlur={() => handleBlur("startsAt")}
                errorMsg={errMSg.startsAt}
                required
              />
            </label>
            <label className={cn(labelStyle)}>
              <span className={cn(labelRequiredStyle)}>업무 시간</span>
              <Input
                name="workhour"
                type="number"
                min={1}
                max={24}
                value={formData.workhour}
                onChange={handleInputChange}
                onBlur={() => handleBlur("workhour")}
                errorMsg={errMSg.workhour}
                isUnit="시간"
                required
              />
            </label>
          </div>
          <label className={cn(labelStyle)}>
            <span>공고 설명</span>
            <Textarea name="description" value={formData.description} maxLength={500} onChange={handleInputChange} />
          </label>
          <Button type="submit" disabled={isPending || hasError} status="filled" className="m-auto h-48 tablet:w-312">
            {isPending ? "등록 중..." : "등록하기"}
          </Button>
        </form>
        <MessageModal
          isOpen={isModalOpen}
          message={modalData.message}
          onClose={() => setIsModalOpen(false)}
          footers={modalData.buttons}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
