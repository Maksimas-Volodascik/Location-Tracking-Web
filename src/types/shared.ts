//Shared types and interfaces
export const BASE_URL = "https://localhost:7256/v1/";

export type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type DeviceData = {
  id: string;
  imei: string;
  name: string;
  isEnabled: boolean;
  lastSeen: string;
  dateAdded: string;
  userId: string;
  user: null;
  deviceModelId: string;
  deviceModel: null;
};

export type RecordData = {
  rawData: string;
  parsedData: string;
  receivedAt: string;
  expiresAt: string;
};

export type TableHeader = {
  key: string;
  flex: "max-content" | "1fr" | string;
};
