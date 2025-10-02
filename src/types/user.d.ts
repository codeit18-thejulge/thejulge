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
