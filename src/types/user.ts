//Shared types and interfaces
export const BASE_URL = "https://localhost:7256/v1/";

export type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};
