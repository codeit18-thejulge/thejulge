import Table from "@/components/Table";

export default function Home() {
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <Table userType={"employer"} res="" limit={0} count={5} />
    </>
  );
}