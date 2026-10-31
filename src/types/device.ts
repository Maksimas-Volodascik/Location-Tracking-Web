//Device domain: types, form defaults and mapping

export type DeviceData = {
  id: string;
  imei: string;
  name: string;
  isEnabled: boolean;
  lastSeen: string;
  dateAdded: string;
  deviceModelId: string;
  workspaceId: string;
};

export type DeviceForm = {
  imei: string;
  name: string;
  isEnabled: boolean;
  deviceModelId: string;
};

export type RecordData = {
  rawData: string;
  parsedData: string;
  receivedAt: string;
  expiresAt: string;
};

export const EMPTY_FORM: DeviceForm = {
  imei: "",
  name: "",
  isEnabled: false,
  deviceModelId: "",
};

export function toForm(device: DeviceData): DeviceForm {
  return {
    imei: device.imei,
    name: device.name,
    isEnabled: device.isEnabled,
    deviceModelId: device.deviceModelId,
  };
}
