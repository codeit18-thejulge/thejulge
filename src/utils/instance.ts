import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const instance: AxiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// API 요청 전 항상 실행
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 config를 반환해야 요청이 정상적으로 보내짐
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// API 응답 후 항상 실행
instance.interceptors.response.use(
  // 정상 응답
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config;
    // console.log(
    //   "토큰 만료시에 어떻게 처리해주는지 나중에 체크해보기",
    //   error.response.status
    // );
    return Promise.reject(error);
  },
);
