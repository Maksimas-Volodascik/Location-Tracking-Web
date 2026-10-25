export type UserData = {
  userGuid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  //isOnline: boolean; true - connected last 24 hours ago
};

export type UpdateUserData = {
  firstName: string;
  lastName: string;
  role: string | undefined;
};

export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const EMPTY_USER_FORM: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function toUserForm(user: UserData): UserForm {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
  };
}
