import Button from "@/components/Button";
import Layout from "@/components/Layout";
import useCheckAuth from "@/hooks/useCheckAuth";
import { getCookieValue } from "@/utils/getCookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ShopInfo = () => {
  useCheckAuth("employer");

  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/shopinfo/register");
  };

  useEffect(() => {
    const shopId = getCookieValue(document.cookie, "shopId");

    if (shopId) {
      router.push(`/shopinfo/${shopId}`);
    }
  }, [router]);

  return (
    <div>
      <div className="mx-auto max-w-351 pt-40 tablet:max-w-680 tablet:pt-40 desktop:max-w-964">
        <h1 className="mb-16 text-20 font-bold tablet:mb-24 tablet:text-28">내가게</h1>
        <div className="flex h-195 flex-col items-center justify-center gap-24 rounded-12 border bg-transparent">
          <span>내 가게를 소개하고 공고도 등록해 보세요.</span>
          <Button onClick={handleRegisterClick} className="h-37 w-108 tablet:h-47 tablet:w-346" status="filled">
            가게 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
ShopInfo.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
