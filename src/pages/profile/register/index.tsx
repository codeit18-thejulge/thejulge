import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { usePutMyInfoQuery } from "@/hooks/api/user/usePutMyInfoQuery";
import { UserInfoItem } from "@/types/global";
import { ChangeEvent, useState } from "react";
import IcXButton from "@/assets/svgs/x.svg";
import { useRouter } from "next/router";

const userId = "906ccb00-4e5c-4340-a737-38741bde10a4"; // 추후 변경

const ProfileRegister = () => {
  const router = useRouter();

  const { mutate: putMyInfo } = usePutMyInfoQuery();

  const [formData, setFormData] = useState<UserInfoItem>({
    name: "",
    phone: "",
    address: "서울시 강남구", // 추후변경
    bio: "",
  });

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = () => {
    putMyInfo({ userId, data: formData });
  };

  const handleCancelClick = () => {
    router.back();
  };
  return (
    <div className="container mx-auto flex flex-col gap-32">
      <h2 className="flex items-center justify-between">
        <span className="text-20-bold tablet:text-28-bold">내 프로필</span>
        <button onClick={handleCancelClick}>
          <IcXButton className="h-32 w-32" />
        </button>
      </h2>
      <section className="flex flex-col gap-20">
        <div className="grid gap-20 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
          <div>
            <label className="text-16-regular">
              <span>이름</span>
              <span className="text-red-30">*</span>
            </label>
            <Input name="name" value={formData.name} onChange={handleProfileChange} />
          </div>
          <div>
            <label className="text-16-regular">
              <span>연락처</span>
              <span className="text-red-30">*</span>
            </label>
            <Input name="phone" value={formData.phone} onChange={handleProfileChange} />
          </div>
          <div>
            <label className="text-16-regular">
              <span>선호지역</span>
              <span className="text-red-30">*</span>
            </label>
            {/* 추후 변경 */}
            <Input />
          </div>
        </div>

        <div>
          <label className="text-16-regular">소개</label>
          <Textarea name="bio" value={formData.bio} onChange={handleProfileChange} />
        </div>
      </section>
      <Button status="filled" className="self-center px-136 py-14" onClick={handleRegisterClick}>
        등록하기
      </Button>
    </div>
  );
};

export default ProfileRegister;
