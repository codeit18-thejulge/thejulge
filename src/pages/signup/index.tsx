import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import MessageModal from "@/components/Modal/MessageModal";
import { SignupRequest, useSignupQuery } from "@/hooks/api/user/useSignupQuery";
import { UserType } from "@/types/global";
import Logo from "@/assets/svgs/logo-md.svg";
import IcCheck from "@/assets/svgs/ic_check.svg";
import IcCircleGray from "@/assets/svgs/ic_circle-gray.svg";
import { cn } from "@/utils";
import { useModal } from "@/hooks/useModal";

const inputClass = "h-58 w-full";
const buttonClass = "h-48 w-full";
const labelClass = "mb-8 block";
const typeClass = "flex w-167 gap-10 rounded-30 border border-solid px-41 py-13";
const PART = "employee";
const BOSS = "employer";

const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const pwdRegEx = /^.{8,20}$/;

const Signup = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupRequest>({ email: "", password: "", type: PART });
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "", pwdcheck: "" });
  const { mutate: postSignup, isPending } = useSignupQuery();
  const [modalMessage, setModalMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { openModal, closeModal } = useModal();

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleSignupDataChange: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setSignupData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    let msg = "";
    if (!value) {
      setErrorMsg((prev) => ({ ...prev, [name]: msg }));
      return;
    }

    if (name === "email" && !emailRegEx.test(value)) {
      msg = "이메일 형식으로 작성해주세요.";
    } else if (name === "password" && !pwdRegEx.test(value)) {
      msg = "8자 이상 입력해주세요.";
    } else if (name === "pwdcheck" && signupData.password !== value) {
      msg = "비밀번호가 일치하지 않습니다.";
    }

    setErrorMsg((prev) => ({ ...prev, [name]: msg }));
  };

  const handleTypeSelect = (type: UserType) => {
    setSignupData((prev) => ({ ...prev, type: type }));
  };

  const handleTypeStyle = (type: UserType) => {
    if (signupData.type === type) {
      return "border-primary";
    } else {
      return "border-gray-30";
    }
  };

  const renderIcon = (type: UserType) => {
    if (signupData.type === type) {
      return <IcCheck className="text-green-60 inline-block" />;
    } else {
      return <IcCircleGray className="inline-block" />;
    }
  };

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errorMsg.email || errorMsg.password || errorMsg.pwdcheck) {
      setModalMessage("입력한 이메일 혹은 비밀번호를 확인해주세요");
      setIsOpen(true);
      return;
    }

    postSignup(signupData, {
      onSuccess: () => {
        openModal("confirm", "가입이 완료되었습니다", () => router.replace(`/signin`), {
          closeOnOverlayClick: false,
          closeOnEsc: false,
        });
      },
      onError: (error) => {
        console.log(error);
        let errMsg = "회원가입에 실패했습니다";
        if (axios.isAxiosError(error)) {
          errMsg = error.response?.data?.message;
        } else {
          errMsg = error?.message as string;
        }
        openModal("confirm", errMsg, closeModal);
      },
    });
  };

  return (
    <div className="mx-auto my-[15%] w-350">
      <Link href="/">
        <Logo className="text-green-60 mx-auto mb-40 w-248" />
      </Link>
      <form method="post" onSubmit={handleSignupSubmit}>
        <div className="mb-28">
          <label className={labelClass} htmlFor="email">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            onChange={handleSignupDataChange}
            onBlur={handleBlur}
            errorMsg={errorMsg.email}
            aria-label="이메일 입력 영역"
          />
        </div>
        <div className="mb-28">
          <label className={labelClass} htmlFor="password">
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            className={inputClass}
            onChange={handleSignupDataChange}
            onBlur={handleBlur}
            errorMsg={errorMsg.password}
            aria-label="패스워드 입력 영역"
          />
        </div>
        <div className="mb-28">
          <label className={labelClass} htmlFor="pwdcheck">
            비밀번호 확인
          </label>
          <Input
            id="pwdcheck"
            name="pwdcheck"
            type="password"
            className={inputClass}
            onChange={handleSignupDataChange}
            onBlur={handleBlur}
            errorMsg={errorMsg.pwdcheck}
            aria-label="패스워드 확인 입력 영역"
          />
        </div>
        <div className="mb-28">
          <p className="mb-8">회원 유형</p>
          <div className="flex justify-between">
            <button
              type="button"
              className={cn(typeClass, handleTypeStyle(PART))}
              onClick={() => handleTypeSelect(PART)}
              aria-label="알바님 선택"
            >
              {renderIcon(PART)}
              알바님
            </button>
            <button
              type="button"
              className={cn(typeClass, handleTypeStyle(BOSS))}
              onClick={() => handleTypeSelect(BOSS)}
              aria-label="사장님 선택"
            >
              {renderIcon(BOSS)}
              사장님
            </button>
          </div>
        </div>
        <div className="mb-16">
          <Button type="submit" status="filled" className={buttonClass} disabled={isPending} aria-label="가입하기 버튼">
            가입하기
          </Button>
        </div>
      </form>
      <div className="flex justify-center gap-10">
        <span>계정이 있으신가요?</span>
        <Link href="/signin" aria-label="로그인하기 링크" className="text-blue-20 underline">
          로그인하기
        </Link>
      </div>
      <MessageModal
        isOpen={isOpen}
        message={modalMessage}
        onClose={handleClose}
        footers={[
          {
            buttonText: "닫기",
            onClick: handleClose,
            style: "lined",
            className: "w-80 h-38",
          },
        ]}
      ></MessageModal>
    </div>
  );
};

export default Signup;
