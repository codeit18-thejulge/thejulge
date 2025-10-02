import NormalBadge from "@/components/Badge/NormalBadge";
import PayBadge from "@/components/Badge/PayBadge";
import ClosedBadge from "@/components/Badge/ClosedBadge";

export default function Home() {
  return (
    <>
      <h1>3팀 화이팅</h1>
      <NormalBadge status="pending"/>
      <NormalBadge status={"accepted"}/>
      <NormalBadge status={"rejected"}/>
      <NormalBadge status={"canceled"}/>
      <PayBadge hourlyPay={15000} originalHourlyPay={10000} closed={false}/>
      <ClosedBadge propText={"서울시 성북"} />
    </>
  );
}
