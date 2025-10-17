import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { getCookieValue } from '@/utils/getCookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ShopInfo= () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/shopinfo/register')
  }

  useEffect(() => {
    const shopId = getCookieValue(document.cookie, "shopId");

    if (shopId) {
      router.push(`/shopinfo/${shopId}`);
    }

  }, [router]);
  
  return (
    <div>
      <div className="max-w-351 tablet:max-w-680 desktop:max-w-964 mx-auto pt-40 tablet:pt-40">
        <h1 className="text-20 font-bold tablet:text-28 mb-16 tablet:mb-24">내가게</h1>   
        <div className="flex flex-col gap-24 justify-center items-center border h-195 bg-transparent rounded-12">
          <span>내 가게를 소개하고 공고도 등록해 보세요.</span>
          <Button onClick={handleRegisterClick} className="w-108 h-37 tablet:w-346 tablet:h-47" status="filled">가게 등록하기</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
ShopInfo.getLayout  = (page: React.ReactNode) => <Layout>{page}</Layout>