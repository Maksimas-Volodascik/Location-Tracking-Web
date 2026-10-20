export type LogEntry = {
  traceId: string;
  imei: string;
  receivedDate: string;
  message: string;
  severity: string;
};

export type AdminTableOption = "users" | "devices" | "deviceModels";

export type DeviceModelData = {
  id: string;
  name: string;
  protocolName: string;
  description: string;
};
