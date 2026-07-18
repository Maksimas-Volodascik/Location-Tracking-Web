import { type LoginProps, type RegisterProps } from "../types/shared";
import { postRequest } from "./httpClient";

export async function userRegister({
  email,
  firstName,
  lastName,
  password,
}: RegisterProps): Promise<string> {
  return await postRequest<string>("users/register", {
    firstName,
    lastName,
    email,
    password,
  });
}

export async function userLogin({
  email,
  password,
}: LoginProps): Promise<string> {
  const accessToken = await postRequest<string>("users/login", {
    email,
    password,
  });

  return accessToken;
}
