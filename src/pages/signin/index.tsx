import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import MessageModal from "@/components/Modal/MessageModal";
import { useLoginQuery, LoginRequest } from "@/hooks/api/user/useLoginQuery";
import Logo from "@/assets/svgs/logo-md.svg";

const inputClass = "h-58 w-full";
const buttonClass = "h-48 w-full";
const labelClass = "mb-8 block";

const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const pwdRegEx = /.{8,20}$/;

const Signin = () => {
  const [loginData, setLoginData] = useState<LoginRequest>({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });
  const [modalMessage, setModalMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: postLogin, isError, isPending, error } = useLoginQuery();

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let errMsg = "로그인에 실패했습니다.";
    if (isError) {
      if (axios.isAxiosError(error)) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message as string;
      }
      setModalMessage(errMsg);
      setIsOpen(true);
    }
  }, [isError]);

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
      msg = "8자 이상 작성해주세요.";
    }

    setErrorMsg((prev) => ({ ...prev, [name]: msg }));
  };

  const handleLoginDataChange: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errorMsg.email || errorMsg.password) {
      setModalMessage("이메일 혹은 비밀번호를 확인해주세요");
      setIsOpen(true);
      return;
    }

    postLogin(loginData);
  };

  return (
    <div className="mx-auto mt-[15%] w-350">
      <Link href="/">
        <Logo className="mx-auto mb-40 w-248" />
      </Link>
      <form method="post" onSubmit={handleSignin}>
        <div className="mb-28">
          <label className={labelClass} htmlFor="email">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            onChange={handleLoginDataChange}
            onBlur={handleBlur}
            errorMsg={errorMsg.email}
            autoComplete="on"
            aria-label="이메일 입력"
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
            onChange={handleLoginDataChange}
            onBlur={handleBlur}
            errorMsg={errorMsg.password}
            aria-label="비밀번호 입력"
          />
        </div>
        <div className="mb-20">
          <Button status="filled" className={buttonClass} type="submit" disabled={isPending} aria-label="로그인 버튼">
            로그인 하기
          </Button>
        </div>
      </form>
      <div className="flex justify-center gap-10">
        <p className="text-center">회원이 아니신가요?</p>
        <Link href="/signup" aria-label="회원가입하기 링크" className="text-blue-20 underline">
          회원가입하기
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
      />
    </div>
  );
};

export default Signin;
