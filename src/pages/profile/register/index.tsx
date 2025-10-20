import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { usePutMyInfoQuery } from "@/hooks/api/user/usePutMyInfoQuery";
import { Option, SeoulAddress } from "@/types/global";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import IcXButton from "@/assets/svgs/ic_close.svg";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMyInfo, useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { SEOUL_ADDRESS_OPTIONS } from "@/constants/SEOUL_ADDRESS";
import SelectBox from "@/components/SelectBox";
import MessageModal from "@/components/Modal/MessageModal";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Layout from "@/components/Layout";
import { getCookieValue } from "@/utils/getCookie";

type RegisterData = {
  name: string;
  phone: string;
  address: SeoulAddress | undefined;
  bio?: string;
};

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie;
  const userId = getCookieValue(cookie, "userId");
  const userType = getCookieValue(cookie, "userType");

  if (!userId) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (userType !== "employee") {
    return {
      redirect: {
        destination: `/shopinfo`,
        permanent: false,
      },
    };
  }

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
  const { mutate: putMyInfo, isSuccess } = usePutMyInfoQuery();

  const [profileData, setProfileData] = useState<RegisterData>({
    name: "",
    phone: "",
    address: undefined,
    bio: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const hasInvalidChars = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);

      if (hasInvalidChars) {
        setPhoneError("숫자(0-9)만 입력 가능합니다.");
      } else {
        setPhoneError("");
      }

      const formatted = formatPhoneNumber(value);
      return setProfileData((prev) => ({ ...prev, [name]: formatted }));
    }
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneBlur = () => {
    if (profileData.phone.length > 0 && profileData.phone.length < 13) {
      setPhoneError("연락처를 13자리에 맞게 입력해 주세요.");
    } else {
      setPhoneError("");
    }
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
    router.push("/profile");
  };

  const handleConfirmClick = () => {
    setIsOpenModal(false);
    router.back();
  };

  useEffect(() => {
    if (isSuccess) {
      setModalMessage("프로필 등록이 완료되었습니다");
      setIsOpenModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userInfo?.item) {
      const { name, phone, address, bio } = userInfo.item;
      const newProfileData = {
        name: name ?? "",
        phone: phone ?? "",
        address: address,
        bio: bio ?? "",
      };

      setProfileData(newProfileData);
    }
  }, [userInfo]);

  useEffect(() => {
    const { name, phone, address } = profileData;
    if (name && phone?.length === 13 && address && !phoneError) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [profileData, phoneError]);

  return (
    <div className="bg-gray-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-32 px-24 py-60">
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
              <Input
                name="phone"
                value={profileData?.phone}
                onChange={handleProfileChange}
                onBlur={handlePhoneBlur}
                errorMsg={phoneError}
                maxLength={13}
              />
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
        <Button
          status="filled"
          className="m-auto h-48 tablet:w-312"
          onClick={handleRegisterClick}
          disabled={isDisabled}
        >
          등록하기
        </Button>

        <MessageModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          message={modalMessage}
          footers={[{ buttonText: "확인", style: "filled", onClick: handleConfirmClick, className: "py-8 px-32" }]}
        />
      </div>
    </div>
  );
};

ProfileRegister.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export { getServerSideProps };
export default ProfileRegister;
