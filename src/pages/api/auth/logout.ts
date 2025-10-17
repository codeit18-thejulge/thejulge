import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "허용되지 않은 메소드입니다" });
  }

  const cookies = [
    "accessToken=; Path=/; HttpOnly; Max-Age=0;",
    "userId=; Path=/; Max-Age=0;",
    "shopId=; Path=/; Max-Age=0;",
  ];
  res.setHeader("Set-Cookie", cookies);

  return res.status(200).json({ message: `로그아웃 성공` });
}
