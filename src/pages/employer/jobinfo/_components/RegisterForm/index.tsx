import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

import { cn } from "@/utils";
import dayjs from "dayjs";
import { ChangeEvent, FormEvent, useState } from "react";

const MINIMUM_WAGE = 10030;
const labelStyle = "flex flex-col flex-1 text-16-regular text-black h-100";
const labelNormalStyle = "mb-8";
const labelRequiredStyle = "after:content-['*'] after:text-error";
const inputStyle = "rounded-md bg-white";

export interface FormData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

interface RegisterFormProps {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
  submitLabel?: string;
}

const RegisterForm = ({ defaultValues, onSubmit, isPending, submitLabel }: RegisterFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    hourlyPay: defaultValues?.hourlyPay ?? MINIMUM_WAGE,
    startsAt: dayjs(defaultValues?.startsAt).format("YYYY-MM-DDTHH:mm") ?? dayjs().format("YYYY-MM-DDTHH:mm"),
    workhour: defaultValues?.workhour ?? 1,
    description: defaultValues?.description ?? "",
  });

  const [displayPay, setDisplayPay] = useState(formData.hourlyPay.toLocaleString());
  const [errMSg, setErrMsg] = useState({ hourlyPay: "", startsAt: "", workhour: "" });

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payInput = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(payInput)) {
      const num = payInput === "" ? 0 : Number(payInput);
      setFormData((prev) => ({ ...prev, hourlyPay: num }));
      setDisplayPay(num.toLocaleString("ko-KR"));
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleHourlyPayBlur = () => {
    let message = "";
    if (!formData.hourlyPay) {
      message = "시급은 필수 입력 값입니다.";
    } else if (formData.hourlyPay < MINIMUM_WAGE) {
      message = `시급은 최소 ${MINIMUM_WAGE.toLocaleString()}원 이상이어야 합니다.`;
    }
    setErrMsg((prev) => ({ ...prev, hourlyPay: message }));
  };
  const handleStartsAtBlur = () => {
    const isBefore = dayjs(formData.startsAt).isBefore(dayjs());
    setErrMsg((prev) => ({ ...prev, startsAt: isBefore ? "시작 일시는 현재 시각 이후여야 합니다." : "" }));
  };
  const handleWorkhourBlur = () => {
    const isUnder24 = formData.workhour < 1 || formData.workhour > 24;
    setErrMsg((prev) => ({ ...prev, workhour: isUnder24 ? "업무 시간은 1~24시간 사이여야 합니다." : "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleStartsAtBlur();
    onSubmit({ ...formData, startsAt: dayjs(formData.startsAt).toISOString() });
  };

  const hasError = Object.values(errMSg).some((msg) => msg);

  return (
    <>
      <form className="flex flex-col gap-32" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-20 tablet:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>시급</span>
            <Input
              name="hourlyPay"
              type="text"
              value={displayPay}
              onChange={handlePayChange}
              onBlur={handleHourlyPayBlur}
              errorMsg={errMSg.hourlyPay}
              isUnit="원"
              required
              className={inputStyle}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>시작 일시</span>
            <Input
              name="startsAt"
              type="datetime-local"
              min={dayjs().format("YYYY-MM-DDTHH:mm")}
              value={formData.startsAt}
              onChange={handleInputChange}
              onBlur={handleStartsAtBlur}
              errorMsg={errMSg.startsAt}
              required
              className={cn(inputStyle, "h-[100%]")}
            />
          </label>
          <label className={labelStyle}>
            <span className={cn(labelNormalStyle, labelRequiredStyle)}>업무 시간</span>
            <Input
              name="workhour"
              type="number"
              min={1}
              max={24}
              value={formData.workhour.toString()}
              onChange={handleInputChange}
              onBlur={handleWorkhourBlur}
              errorMsg={errMSg.workhour}
              isUnit="시간"
              required
              className={inputStyle}
            />
          </label>
        </div>
        <label className={labelStyle}>
          <span className={labelNormalStyle}>공고 설명</span>
          <Textarea name="description" value={formData.description} maxLength={500} onChange={handleInputChange} />
        </label>
        <Button type="submit" disabled={isPending || hasError} status="filled" className="m-auto h-48 tablet:w-312">
          {isPending ? `${submitLabel} 중...` : `${submitLabel}하기`}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
