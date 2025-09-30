export interface SignupRequest {
  email: string;
  password: string;
  type: "employee" | "employer";
}

export interface SignupResponse {
  item: {
    id: string;
    email: string;
    type: "employee" | "employer";
  };
  links: unknown[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: {
        id: string;
        email: string;
        type: "employee" | "employer";
        name: string;
        phone: string;
        address: string;
        bio: string;
      };
      href: string;
    };
  };
  links: unknown[];
}
