import {
  type DeviceData,
  type DeviceForm,
  type RecordData,
} from "../types/shared";
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
    deviceModelName: deviceData.deviceModelName,
  };
}

export async function getAllDevices(): Promise<DeviceData[]> {
  return getRequest<DeviceData[]>("device");
}

export async function getDeviceRecords(
  deviceId: string,
): Promise<RecordData[]> {
  return getRequest<RecordData[]>(`records/${deviceId}`);
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
