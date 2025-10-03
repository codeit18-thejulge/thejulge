import { useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { useSignupQuery } from "@/hooks/api/user/useSignupQuery";
import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";
import { usePutMyInfoQuery } from "@/hooks/api/user/usePutMyInfoQuery";
import { useGetUserAlertsQuery } from "@/hooks/api/alert/useGetUserAlertsQuery";

export default function Home() {
  const { data: getMyInfo } = useGetMyInfoQuery("17fe75af-ca33-4e41-9ab4-d9a4c4cfd1fc");
  const { mutate: postSignup } = useSignupQuery();
  const { mutate: postLogin } = useLoginQuery();
  const { mutate: putMyInfo } = usePutMyInfoQuery();
  const { data: getUserAlerts } = useGetUserAlertsQuery({
    userId: "17fe75af-ca33-4e41-9ab4-d9a4c4cfd1fc",
    params: { offset: 1 },
  });
  const s = () => {
    postSignup({ email: "test3@example.com", password: "1234", type: "employer" });
  };

  const l = () => {
    postLogin({ email: "test3@example.com", password: "1234" });
  };
  const p = () => {
    putMyInfo({
      userId: "17fe75af-ca33-4e41-9ab4-d9a4c4cfd1fc",
      data: { name: "정상인1", phone: "010-9876-5432", address: "서울시 관악구", bio: "dddd" },
    });
  };
  const g = () => {
    console.log("내정보조회", getMyInfo);
    console.log("알람조회", getUserAlerts);
  };
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={s}>회원가입</button>
      <button onClick={l}>로그인</button>
      <button onClick={p}>내정보수정</button>
      <button onClick={g}>내정보조회</button>
    </>
  );
}
