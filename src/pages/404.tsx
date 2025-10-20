import { ReactNode } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import IcArrow from "@/assets/svgs/ic_uparrow.svg";
import IcHome from "@/assets/svgs/ic_home.svg";
import { useRouter } from "next/router";

const btnStyle = "flex h-40 w-full tablet:w-120 max-w-400 items-center justify-center gap-6 text-14-regular";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-32 p-24">
      <h1 className="from-green-40 to-green-60 bg-gradient-to-br bg-clip-text text-[100px] font-extrabold leading-none text-transparent tablet:text-[150px] desktop:text-[200px]">
        404
      </h1>
      <div className="text-center">
        <h2 className="text-xl">Page Not Found</h2>
        <p className="my-20 max-w-400 text-center text-gray-50">
          앗! 찾으시는 페이지가 존재하지 않습니다.
          <br />
          홈으로 돌아가거나 이전 페이지로 이동해보세요.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10 tablet:flex-row">
        <Button status="filled" className={btnStyle} onClick={() => router.push("/joblist")}>
          <IcHome className="w-16" />
          홈으로
        </Button>
        <Button status="lined" className={btnStyle} onClick={() => router.back()}>
          <IcArrow className="w-16 -rotate-90" />
          이전으로
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
NotFound.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
