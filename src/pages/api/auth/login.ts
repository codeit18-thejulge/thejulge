import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { LoginResponse } from "@/hooks/api/user/useLoginQuery";
import { GetMyInfoResponse } from "@/hooks/api/user/useGetMyInfoQuery";
const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "405", message: "허용되지 않은 요청입니다" });
  }

  try {
    const { email, password } = req.body;

    const { data } = await axios.post<LoginResponse>(`${NEXT_PUBLIC_BACKEND_API_URL}/token`, {
      email,
      password,
    });

    const { item } = data;

    const { token } = item;
    const userId = item.user.item.id;

    const cookies = [`accessToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`, `userId=${userId};  Path=/;`];

    // 로그인 후 받아온 userId를 통해서 내 정보 조회 요청하는 코드입니다~
    const getMyInfoResponse = await axios.get<GetMyInfoResponse>(`${NEXT_PUBLIC_BACKEND_API_URL}/users/${userId}`);

    const { shop } = getMyInfoResponse.data.item;

    if (shop) {
      const shopId = shop.item.id;
      cookies.push(`shopId=${shopId}; Path=/;`);
    }

    res.setHeader("Set-Cookie", cookies);

    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: "로그인 실패" });
  }
}
