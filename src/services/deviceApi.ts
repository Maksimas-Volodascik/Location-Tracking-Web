import {
  type DeviceData,
  type DeviceForm,
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
    deviceModelId: "01a0dd1d-7798-75ea-8be2-93b4b7f509ce",
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

export async function createNewDevice(deviceData: DeviceForm): Promise<void> {
  console.log(deviceData);
  return postRequest<void>("device", toDevicePayload(deviceData));
}

export async function updateDevice(
  deviceData: DeviceForm,
  deviceId: string,
): Promise<void> {
  return patchRequest<void>(`device/${deviceId}`, toDevicePayload(deviceData));
}

export async function deleteDevice(deviceId: string): Promise<void> {
  return deleteRequest<void>(`device/${deviceId}`);
}
