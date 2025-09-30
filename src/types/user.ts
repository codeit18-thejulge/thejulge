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
