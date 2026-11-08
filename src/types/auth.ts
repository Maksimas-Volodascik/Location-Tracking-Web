//Authentication types and interfaces

export type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  workspaceName: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
  //refreshToken: string;
};

export type InvitationToken = {
  token: string;
};

export type InviteRegisterProps = {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
