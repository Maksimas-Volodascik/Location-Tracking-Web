import {
  type DeviceData,
  type DeviceForm,
  type DevicePositionData,
  type RecordData,
} from "../types/device";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "./httpClient";

function toDevicePayload(deviceData: DeviceForm) {
  return {
    imei: deviceData.imei,
    name: deviceData.name,
    isEnabled: deviceData.isEnabled,
    deviceModelId: deviceData.deviceModelId,
  };
}

export async function getAllDevices(): Promise<DeviceData[]> {
  return getRequest<DeviceData[]>("device");
}

export async function getDeviceRecords(
  deviceId: string,
): Promise<RecordData[]> {
  return getRequest<RecordData[]>(`records/${deviceId}/records`);
}

export async function getDevicePositions(
  deviceId: string,
): Promise<DevicePositionData[]> {
  return getRequest<DevicePositionData[]>(`records/${deviceId}/positions`);
}

export async function createNewDevice(
  deviceData: DeviceForm,
): Promise<DeviceData> {
  return postRequest<DeviceData>("device", toDevicePayload(deviceData));
}

export async function updateDevice(
  deviceData: DeviceForm,
  deviceId: string,
): Promise<DeviceData> {
  return patchRequest<DeviceData>(
    `device/${deviceId}`,
    toDevicePayload(deviceData),
  );
}

export async function deleteDevice(deviceId: string): Promise<void> {
  return deleteRequest<void>(`device/${deviceId}`);
}
