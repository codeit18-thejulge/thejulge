import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import Textarea from "@/components/Textarea";
import IcClose from "@/assets/svgs/ic_close.svg";
import { SEOUL_ADDRESS_OPTIONS } from "@/constants/SEOUL_ADDRESS";
import { SHOP_CATEGORY_OPTIONS } from "@/constants/SHOP_CATEGORY";
import { PostShopRequest } from "@/hooks/api/shop/usePostShopQuery";
import { Option } from "@/types/global";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import RegisterImage from "./RegisterImage";
import { cn } from "@/utils";

const MINIMUM_WAGE = 10030;

const labelStyle = "flex flex-col flex-1 text-16-regular text-black h-100";
const labelNormalStyle = "mb-8";
const labelRequiredStyle = "after:content-['*'] after:text-primary";
const inputStyle = "rounded-md bg-white";

export type FormData = Omit<PostShopRequest, "category" | "address1"> & {
  category?: PostShopRequest["category"];
  address1?: PostShopRequest["address1"];
};

interface RegisterFormProps {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
  submitLabel?: string;
}

const RegisterForm = ({ defaultValues, onSubmit, isPending, submitLabel }: RegisterFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: defaultValues?.name ?? "",
    category: defaultValues?.category ?? undefined,
    address1: defaultValues?.address1 ?? undefined,
    address2: defaultValues?.address2 ?? "",
    description: defaultValues?.description ?? "",
    imageUrl: defaultValues?.imageUrl ?? "",
    originalHourlyPay: defaultValues?.originalHourlyPay ?? MINIMUM_WAGE,
  });
  const [displayPay, setDisplayPay] = useState(formData.originalHourlyPay.toLocaleString());
  const [errMSg, setErrMsg] = useState({
    name: "",
    category: "",
    address1: "",
    address2: "",
    originalHourlyPay: "",
    imageUrl: "",
  });

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payInput = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(payInput)) {
      const num = payInput === "" ? 0 : Number(payInput);
      setFormData((prev) => ({ ...prev, originalHourlyPay: num }));
      setDisplayPay(num.toLocaleString("ko-KR"));
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (name: "category" | "address1") => (option: Option) => {
    setFormData((prev) => ({ ...prev, [name]: option.value }));
  };
  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    setErrMsg((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleImageDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setErrMsg((prev) => ({ ...prev, imageUrl: "가게 이미지는 필수 입력 값입니다." }));
  };

  const handleNameBlur = () => {
    const trimmedValue = formData.name.trim();
    setFormData((prev) => ({ ...prev, name: trimmedValue }));
    setErrMsg((prev) => ({ ...prev, name: trimmedValue ? "" : "가게 이름은 필수 입력 값입니다." }));
  };
  const handleAddress2Blur = () => {
    const trimmedValue = formData.address2.trim();
    setFormData((prev) => ({ ...prev, address2: trimmedValue }));
    setErrMsg((prev) => ({ ...prev, address2: trimmedValue ? "" : "상세 주소는 필수 입력 값입니다." }));
  };
  const handleHourlyPayBlur = () => {
    let message = "";
    if (!formData.originalHourlyPay) {
      message = "시급은 필수 입력 값입니다.";
    } else if (formData.originalHourlyPay < MINIMUM_WAGE) {
      message = `시급은 최소 ${MINIMUM_WAGE.toLocaleString()}원 이상이어야 합니다.`;
    }
    setErrMsg((prev) => ({ ...prev, originalHourlyPay: message }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      setErrMsg((prev) => ({ ...prev, imageUrl: "가게 이미지는 필수 입력 값입니다." }));
      return;
    }
    onSubmit(formData);
  };

  const requiredInputs: (keyof FormData)[] = ["name", "category", "address1", "address2", "originalHourlyPay"];
  const isRequiredInputEmpty = requiredInputs.some((key) => !formData[key]) || !formData.imageUrl;
  const hasError = Object.values(errMSg).some((msg) => msg);

  return (
    <>
      <form className="flex flex-col gap-32" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-20 gap-y-24 tablet:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]">
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>가게 이름</span>
            <Input
              name="name"
              type="text"
              value={formData.name}
              maxLength={50}
              onChange={handleInputChange}
              onBlur={handleNameBlur}
              errorMsg={errMSg.name}
              required
              className={inputStyle}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>분류</span>
            <SelectBox
              options={SHOP_CATEGORY_OPTIONS}
              onChange={handleSelectChange("category")}
              placeholder={formData.category ?? "선택"}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>주소</span>
            <SelectBox
              options={SEOUL_ADDRESS_OPTIONS}
              onChange={handleSelectChange("address1")}
              placeholder={formData.address1 ?? "선택"}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>상세 주소</span>
            <Input
              name="address2"
              type="text"
              value={formData.address2}
              maxLength={50}
              onChange={handleInputChange}
              onBlur={handleAddress2Blur}
              errorMsg={errMSg.address2}
              required
              className={inputStyle}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>기본 시급</span>
            <Input
              name="originalHourlyPay"
              type="text"
              value={displayPay}
              onChange={handlePayChange}
              onBlur={handleHourlyPayBlur}
              errorMsg={errMSg.originalHourlyPay}
              isUnit="원"
              required
              className={inputStyle}
            />
          </label>
        </div>
        <div className={labelStyle}>
          <span className={cn(labelNormalStyle, labelRequiredStyle)}>가게 이미지</span>
          <div className="relative w-full tablet:w-fit">
            <RegisterImage
              initialUrl={formData.imageUrl}
              onUploaded={handleImageChange}
              className={cn(errMSg.imageUrl && "border-red-40")}
            />
            {formData.imageUrl && (
              <button
                type="button"
                aria-label="이미지 삭제"
                onClick={handleImageDelete}
                className="absolute right-10 top-10 z-10 flex h-32 w-32 items-center justify-center rounded-full bg-white opacity-40"
              >
                <IcClose className="w-24" />
              </button>
            )}
          </div>
          <p className="mt-8 text-12 text-red-40">{errMSg.imageUrl}</p>
        </div>
        <label className={labelStyle}>
          <span className={labelNormalStyle}>가게 설명</span>
          <Textarea name="description" value={formData.description} maxLength={500} onChange={handleInputChange} />
        </label>
        <Button
          type="submit"
          disabled={isPending || hasError || isRequiredInputEmpty}
          status="filled"
          className="m-auto h-48 tablet:w-312"
        >
          {isPending ? `${submitLabel} 중...` : `${submitLabel}하기`}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
