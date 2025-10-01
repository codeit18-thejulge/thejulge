export interface Link {
  rel: string;
  description: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  href: string;
  body?: { [key: string]: unknown };
  query?: { [key: string]: unknown };
}

export interface User {
  id: string;
  email: string;
  type: "employee" | "employer";
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: {
    item: Shop;
  } | null;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface SignupRequest extends Pick<User, "email" | "type"> {
  password: string;
}

export interface SignupResponse {
  item: Pick<User, "id" | "email" | "type">;
  links: Link[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: Link[];
}

export interface PutMyInfoRequest {
  name: string;
  phone: string;
  address: SeoulAddress;
  bio: string;
}

export type SeoulAddress =
  | "서울시 종로구"
  | "서울시 중구"
  | "서울시 용산구"
  | "서울시 성동구"
  | "서울시 광진구"
  | "서울시 동대문구"
  | "서울시 중랑구"
  | "서울시 성북구"
  | "서울시 강북구"
  | "서울시 도봉구"
  | "서울시 노원구"
  | "서울시 은평구"
  | "서울시 서대문구"
  | "서울시 마포구"
  | "서울시 양천구"
  | "서울시 강서구"
  | "서울시 구로구"
  | "서울시 금천구"
  | "서울시 영등포구"
  | "서울시 동작구"
  | "서울시 관악구"
  | "서울시 서초구"
  | "서울시 강남구"
  | "서울시 송파구"
  | "서울시 강동구";
