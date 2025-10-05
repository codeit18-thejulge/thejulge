import Notification from "@/components/Notification";
import { useState } from "react";

export default function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={() => setIsAlertOpen((prev) => !prev)}>알림창 열기</button>
      {isAlertOpen && <Notification userId="user-10" onClose={() => setIsAlertOpen(false)}></Notification>}
    </>
  );
}
