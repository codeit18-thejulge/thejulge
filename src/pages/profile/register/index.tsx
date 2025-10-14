import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { usePutMyInfoQuery } from "@/hooks/api/user/usePutMyInfoQuery";
import { Option, SeoulAddress, UserInfoItem } from "@/types/global";
import { ChangeEvent, useEffect, useState } from "react";
import IcXButton from "@/assets/svgs/ic_x.svg";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { InferGetServerSidePropsType } from "next";
import { SEOUL_ADDRESS_OPTIONS } from "@/constants/SEOUL_ADDRESS";
import SelectBox from "@/components/SelectBox";
import MessageModal from "@/components/Modal/MessageModal";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

const getServerSideProps = async () => {
  const userId = "d931b357-2c45-4ba7-a3b4-1b09e6b53484"; // 추후 변경
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getMyInfo", userId],
    queryFn: () => getMyInfo(userId),
  });
  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ProfileRegister = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: userInfo } = useGetMyInfoQuery(userId);
  const { mutate: putMyInfo, isError, isSuccess } = usePutMyInfoQuery();

  const [profileData, setProfileData] = useState<Partial<UserInfoItem> | undefined>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      return setProfileData((prev) => ({ ...prev, [name]: formatted }));
    }
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (option: Option) => {
    const { value } = option;
    setProfileData((prev) => ({ ...prev, address: value as SeoulAddress }));
  };

  const handleRegisterClick = () => {
    if (profileData) {
      putMyInfo({ userId, data: profileData });
    }
  };

  const handleCancelClick = () => {
    router.back();
  };

  const handleConfirmClick = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalMessage("프로필 등록이 완료되었습니다");
      setIsOpenModal(true);
    }

    if (isError) {
      setModalMessage("프로필 등록을 실패했습니다");
      setIsOpenModal(true);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (userInfo?.item) {
      setProfileData(userInfo.item);
    }
  }, [userInfo]);

  useEffect(() => {
    if (profileData?.name && profileData?.phone && profileData?.address) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [profileData]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-32 py-60">
      <h2 className="flex items-center justify-between">
        <span className="text-20-bold tablet:text-28-bold">내 프로필</span>
        <button onClick={handleCancelClick}>
          <IcXButton className="h-24 w-24 tablet:h-32 tablet:w-32" />
        </button>
      </h2>
      <section className="flex flex-col gap-20">
        <div className="grid gap-20 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
          <div>
            <label className="text-16-regular">
              <span>이름</span>
              <span className="text-red-30">*</span>
            </label>
            <Input name="name" value={profileData?.name} onChange={handleProfileChange} />
          </div>
          <div>
            <label className="text-16-regular">
              <span>연락처</span>
              <span className="text-red-30">*</span>
            </label>
            <Input name="phone" value={profileData?.phone} onChange={handleProfileChange} />
          </div>
          <div>
            <label className="text-16-regular">
              <span>선호지역</span>
              <span className="text-red-30">*</span>
            </label>
            <SelectBox
              onChange={handleAddressChange}
              options={SEOUL_ADDRESS_OPTIONS}
              placeholder={profileData?.address}
            />
          </div>
        </div>

        <div>
          <label className="text-16-regular">소개</label>
          <Textarea name="bio" value={profileData?.bio} onChange={handleProfileChange} />
        </div>
      </section>
      <Button status="filled" className="self-center px-136 py-14" onClick={handleRegisterClick} disabled={isDisabled}>
        등록하기
      </Button>

      <MessageModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        message={modalMessage}
        footers={[{ buttonText: "확인", style: "filled", onClick: handleConfirmClick, className: "py-8 px-32" }]}
      />
    </div>
  );
};

export { getServerSideProps };
export default ProfileRegister;
