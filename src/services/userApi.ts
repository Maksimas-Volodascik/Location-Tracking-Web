import type { UpdateUserData, UserData } from "../types/users";
import { deleteRequest, getRequest, patchRequest } from "./httpClient";

export async function getAllUsers(): Promise<UserData[]> {
  return getRequest<UserData[]>("users");
}

export async function updateUser(
  userData: UserData,
  userId: string,
): Promise<UserData> {
  return patchRequest<UserData>(`users/${userId}`, userData);
}

export async function deleteUser(userId: string): Promise<void> {
  return deleteRequest<void>(`users/${userId}`);
}
