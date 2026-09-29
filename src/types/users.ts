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
  role: string;
};
