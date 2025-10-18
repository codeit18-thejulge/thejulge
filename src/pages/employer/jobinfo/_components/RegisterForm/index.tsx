import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

import { cn } from "@/utils";
import dayjs from "dayjs";
import { ChangeEvent, FormEvent, useState } from "react";

const MINIMUM_WAGE = 10030;
const labelStyle = "flex flex-col gap-8 flex-1 text-16-regular text-black";
const labelRequiredStyle = "after:content-['*'] after:text-primary";

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
    startsAt: defaultValues?.startsAt ?? dayjs().format("YYYY-MM-DDTHH:mm"),
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData, startsAt: dayjs(formData.startsAt).toISOString() });
  };

  const hasError = Object.values(errMSg).some((msg) => msg);

  return (
    <>
      <form className="flex flex-col gap-32" onSubmit={handleSubmit}>
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
          {isPending ? `${submitLabel} 중...` : `${submitLabel}하기`}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
