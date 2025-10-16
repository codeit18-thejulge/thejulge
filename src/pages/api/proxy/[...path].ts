import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, Method } from "axios";

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.cookies;
  const method = req.method as Method;
  const requestPath = req.url?.replace("/api/proxy", "");
  const requestUrl = `${NEXT_PUBLIC_BACKEND_API_URL}/${requestPath}`;
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": req.headers["content-type"] || "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await axios({
      method,
      url: requestUrl,
      headers,
      data: req.body,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(400).json({ status: 400, message: (error as AxiosError).message });
  }
}
