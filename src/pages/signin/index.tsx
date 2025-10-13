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

const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const pwdRegEx = /^[A-Za-z0-9]{8,20}$/;

const Signin = () => {
  const [loginInfo, setLoginInfo] = useState<LoginRequest>({ email: "", password: "" });
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPwdMsg, setErrorPwdMsg] = useState("");
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

  const handleEmailBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const inputEmail = event.target.value;
    const result = emailRegEx.test(inputEmail);
    if (!result) {
      setErrorEmailMsg("이메일 형식으로 작성해주세요.");
    } else {
      setErrorEmailMsg("");
    }
  };

  const handlePwdBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const inputPwd = event.target.value;
    const result = pwdRegEx.test(inputPwd);
    if (!result) {
      setErrorPwdMsg("8자 이상 작성해주세요.");
    } else {
      setErrorPwdMsg("");
    }
  };

  const handleInput: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setLoginInfo((info) => ({
      ...info,
      [name]: value,
    }));
  };

  const handleSignin = () => {
    postLogin(loginInfo);
  };

  return (
    <div className="mx-auto mt-[15%] w-350">
      <Link href="/">
        <Logo className="mx-auto mb-40 w-248" />
      </Link>
      <section>
        <div className="mb-28">
          <p className="mb-8">이메일</p>
          <Input
            name="email"
            type="email"
            className={inputClass}
            onChange={handleInput}
            onBlur={handleEmailBlur}
            errorMsg={errorEmailMsg}
            autoComplete="on"
          />
        </div>
        <div className="mb-28">
          <p className="mb-8">비밀번호</p>
          <Input
            name="password"
            type="password"
            className={inputClass}
            onChange={handleInput}
            onBlur={handlePwdBlur}
            errorMsg={errorPwdMsg}
          />
        </div>
        <div className="mb-20">
          <Button status="filled" className={buttonClass} onClick={handleSignin} disabled={isPending}>
            로그인 하기
          </Button>
        </div>
      </section>
      <p className="text-center">
        회원이 아니신가요? &nbsp; &nbsp;
        <Link href="/signup" aria-label="회원가입하기 링크" className="text-blue-20 underline">
          회원가입하기
        </Link>
      </p>
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

export default Signin;
