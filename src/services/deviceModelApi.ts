import type { DeviceModelData, DeviceModelForm } from "../types/deviceModels";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "./httpClient";

export async function getAllDeviceModels(): Promise<DeviceModelData[]> {
  return getRequest<DeviceModelData[]>("devicemodel");
}

export async function createNewDeviceModel(
  deviceModelData: DeviceModelForm,
): Promise<DeviceModelData> {
  return postRequest<DeviceModelData>("devicemodel", deviceModelData);
}

export async function updateDeviceModel(
  deviceModelData: DeviceModelForm,
  deviceModelId: string,
): Promise<DeviceModelData> {
  return patchRequest<DeviceModelData>(
    `devicemodel/${deviceModelId}`,
    deviceModelData,
  );
}

export async function deleteDeviceModel(deviceModelId: string): Promise<void> {
  return deleteRequest<void>(`devicemodel/${deviceModelId}`);
}
