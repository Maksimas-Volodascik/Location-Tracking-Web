import {
  type LoginProps,
  type RegisterProps,
  type TokenResponse,
} from "../types/auth";
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
}: LoginProps): Promise<TokenResponse> {
  const accessToken = await postRequest<TokenResponse>("users/login", {
    email,
    password,
  });
  return accessToken;
}
