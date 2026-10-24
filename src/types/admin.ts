export type LogEntry = {
  traceId: string;
  imei: string;
  receivedDate: string;
  message: string;
  severity: string;
};

export type AdminTableOption = "users" | "devices" | "deviceModels";
