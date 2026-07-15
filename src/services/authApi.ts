import { type LoginProps, type RegisterProps } from "../types/shared";
import { baseURL } from "./api";
import { saveAccessToken } from "./tokenService";

export async function userRegister({
  email,
  firstName,
  lastName,
  password,
}: RegisterProps): Promise<string | null> {
  try {
    const response = await fetch(
      `${baseURL}users/register?FirstName=${firstName}&LastName=${lastName}&Email=${email}&Password=${password}`,
      { method: "POST" },
    );

    return await response.text();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("NetworkError")) {
        return "NETWORK_ERROR";
      }
    }

    return "UNKNOWN_ERROR" + String(error);
  }
}

export async function userLogin({
  email,
  password,
}: LoginProps): Promise<string | null> {
  try {
    const response = await fetch(
      `${baseURL}users/login?Email=${email}&Password=${password}`,
      { method: "POST" },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    saveAccessToken(await response.text());

    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("NetworkError")) {
        return "NETWORK_ERROR";
      }
    }

    return "UNKNOWN_ERROR" + String(error);
  }
}
