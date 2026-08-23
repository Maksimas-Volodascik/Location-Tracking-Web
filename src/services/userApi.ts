import type { UserData } from "../types/users";
import { getRequest } from "./httpClient";

export async function getAllUsers(): Promise<UserData[]> {
  return getRequest<UserData[]>("users");
}
