import {
  type InvitationToken,
  type InviteRegisterProps,
  type LoginProps,
  type RegisterProps,
  type TokenResponse,
} from "../types/auth";
import type { Role } from "../types/permissions";
import { getRequest, postRequest } from "./httpClient";

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

export async function validateInviteToken(token: string): Promise<void> {
  return await getRequest<void>(`users/invites?token=${token}`);
}

export async function userInviteRegistration(
  inviteRegisterRequest: InviteRegisterProps,
): Promise<void> {
  return await postRequest<void>(`users/invites/accept`, inviteRegisterRequest);
}
