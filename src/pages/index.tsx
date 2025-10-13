import { usePostPresignedURLQuery } from "@/hooks/api/image/usePostPresignedURLQuery";
import { useLoginQuery } from "@/hooks/api/user/useLoginQuery";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: postLogin } = useLoginQuery();
  const { mutate: postPresignedURL } = usePostPresignedURLQuery();
  const ll = () => {
    postLogin({ email: "a@a.com", password: "1" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRegisterClick = () => {
    if (!selectedFile) {
      return;
    }

    postPresignedURL({ name: selectedFile.name });
    // 가게정보 등록
  };
  return (
    <>
      <h1>3팀 파이팅!</h1>
      <button onClick={ll}>사장로그인</button>
      <input type="file" onChange={handleFileChange} />;<button onClick={handleRegisterClick}>등록</button>
    </>
  );
}
