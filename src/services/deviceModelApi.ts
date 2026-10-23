import type { DeviceModelData } from "../types/admin";
import { getRequest } from "./httpClient";

export async function getAllDeviceModels(): Promise<DeviceModelData[]> {
  return getRequest<DeviceModelData[]>("devicemodel");
}
