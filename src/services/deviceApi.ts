import {
  BASE_URL,
  type DeviceData,
  type EmptyDeviceForm,
  type RecordData,
} from "../types/shared";
import { getAccessToken } from "./tokenService";

export async function getAllDevices(): Promise<DeviceData[] | null> {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${BASE_URL}device`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DeviceData[] = await response.json();
    console.log("Success:", data);

    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function getDeviceRecords(
  deviceId: string | null,
): Promise<RecordData[] | null> {
  if (deviceId == null) {
    console.error("Device ID is null");
    return null;
  }

  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${BASE_URL}records/${deviceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RecordData[] = await response.json();
    console.log("Success:", data);

    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

export async function createNewDevice(deviceData: EmptyDeviceForm) {
  const accessToken = getAccessToken();
  console.log(deviceData);
  try {
    const response = await fetch("https://localhost:7256/v1/device", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imei: deviceData.imei,
        name: deviceData.name,
        isEnabled: deviceData.isEnabled,
        deviceModelName: deviceData.deviceModelName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response; //.json();
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}
