import { BASE_URL, type LoginProps, type RegisterProps } from "../types/shared";
import { saveAccessToken } from "./tokenService";

export async function userRegister({
  email,
  firstName,
  lastName,
  password,
}: RegisterProps): Promise<string | null> {
  try {
    const response = await fetch(
      `${BASE_URL}users/register?FirstName=${firstName}&LastName=${lastName}&Email=${email}&Password=${password}`,
      { method: "POST" },
    );

    return await response.text();
  } catch (error: any) {
    if (error.message.includes("NetworkError")) {
      return "NETWORK_ERROR";
    }
    return "UNKNOWN_ERROR";
  }
}

export async function userLogin({
  email,
  password,
}: LoginProps): Promise<string | null> {
  try {
    const response = await fetch(
      `${BASE_URL}users/login?Email=${email}&Password=${password}`,
      { method: "POST" },
    );
    saveAccessToken(await response.text());
    return null;
  } catch (error: any) {
    if (error.message.includes("NetworkError")) {
      return "NETWORK_ERROR";
    }
    return "UNKNOWN_ERROR" + error.message;
  }
}
