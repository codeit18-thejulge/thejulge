import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import IcClose from "@/assets/svgs/ic_close.svg";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";

const MINIMUN_WAGE = 10030;
const labelStyle = "flex flex-col gap-8 flex-1 text-16-regular text-black";
const labelRequiredStyle = "after:content-['*'] after:text-primary";

const RegisterJobinfo = () => {
  const [formData, setFormData] = useState({
    pay: MINIMUN_WAGE,
    startsAt: dayjs().format("YYYY-MM-DDTHH:mm"),
    workhour: 1,
    description: "",
  });

  // pay 화면표시용
  const [displayPay, setDisplayPay] = useState(formData.pay.toLocaleString());
  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payInput = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(payInput)) {
      const num = payInput === "" ? 0 : Number(payInput);
      setFormData((prev) => ({ ...prev, pay: num }));
      setDisplayPay(payInput);
    }
  };
  const handlePayBlur = () => {
    setDisplayPay(formData.pay.toLocaleString("ko-KR"));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  return (
    <div className="m-auto max-w-1028 px-12 py-40 tablet:px-32 tablet:py-60">
      <div className="relative">
        <IcClose className="absolute right-0 top-0 w-24 tablet:w-32" />
        <form className="flex flex-col gap-32">
          <h1 className="text-20-bold text-black tablet:text-28-bold">공고 등록</h1>
          <div className="grid grid-cols-1 gap-20 tablet:grid-cols-2 desktop:grid-cols-3">
            <label className={cn(labelStyle)}>
              <span className={cn(labelRequiredStyle)}>시급</span>
              <Input
                name="pay"
                type="text"
                min={MINIMUN_WAGE}
                value={displayPay}
                onChange={handlePayChange}
                onBlur={handlePayBlur}
                isPay
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
                required
              />
            </label>
          </div>
          <label className={cn(labelStyle)}>
            <span>공고 설명</span>
            <Textarea name="description" value={formData.description} maxLength={500} onChange={handleInputChange} />
          </label>
          <Button type="submit" status="filled" className="m-auto h-48 tablet:w-312">
            등록하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterJobinfo;
