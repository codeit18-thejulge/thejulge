import { useEffect, useState } from "react";
import NormalBadge from "@/components/Badge/NormalBadge";
import PayBadge from "@/components/Badge/PayBadge";
import ClosedBadge from "@/components/Badge/ClosedBadge";
import ToastContainer from "@/components/Toast";
import Table from "@/components/Table";
import { USER_APPLICATIONS } from "@/utils/mockData";

interface Notice {
  id: string;
  hourlyPay: string;
  description: string;
  startsAt: string;
  workhour: string;
  closed: boolean;
}

export default function Home() {
  // USER_APPLICATIONS에서 notice 배열 추출
  const res = USER_APPLICATIONS.items.map(
    (application) => application.item
  );

  
  return (
    <>
      <h1>3팀 화이팅</h1>
      
      {/* Badge 예제 */}
      <NormalBadge status="pending" />
      <NormalBadge status="accepted" />
      <NormalBadge status="rejected" />
      <NormalBadge status="canceled" />
      
      {/* PayBadge 예제 */}
      <PayBadge hourlyPay={15000} originalHourlyPay={10000} closed={false} />
      
      {/* ClosedBadge 예제 */}
      <ClosedBadge propText="서울시 성북" />
      
      {/* 테이블에 데이터 전달 */}
      <Table userType="employer" res={res} />
      <Table userType="employee" res={res} />
      
      {/* ToastContainer 예제 */}
      <ToastContainer label="신청 완료!" error={true} errorMessage="에러메세지 커스텀" />
      <ToastContainer label="신청 완료!" error={false} />
    </>
  );
}