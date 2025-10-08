import ListPagination from "@/components/ListPagination";
export default function Home() {
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <ListPagination limit={50} count={100} hasNext={true} />
    </>
  );
}
