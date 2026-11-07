import {
  type InvitationToken,
  type LoginProps,
  type RegisterProps,
  type TokenResponse,
} from "../types/auth";
import type { Role } from "../types/permissions";
import { postRequest } from "./httpClient";

export async function userRegister(
  registerRequest: RegisterProps,
): Promise<string> {
  return await postRequest<string>("users/register", registerRequest);
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

export async function userInvite(role: Role): Promise<InvitationToken> {
  const inviteToken = await postRequest<InvitationToken>("users/invites", {
    role: role,
  });
  return inviteToken;
}
