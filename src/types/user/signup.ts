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
