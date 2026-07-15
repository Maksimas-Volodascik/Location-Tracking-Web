import {
  type DeviceData,
  type DeviceForm,
  type RecordData,
} from "../types/shared";
import { baseURL } from "./api";
import { getAccessToken } from "./tokenService";

export async function getAllDevices(): Promise<DeviceData[] | null> {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${baseURL}device`, {
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
    const response = await fetch(`${baseURL}records/${deviceId}`, {
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

    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

export async function createNewDevice(deviceData: DeviceForm) {
  const accessToken = getAccessToken();

  try {
    const response = await fetch(`${baseURL}device`, {
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

    return response;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}

export async function updateDevice(
  deviceData: DeviceForm,
  deviceId: string | null,
) {
  const accessToken = getAccessToken();

  if (deviceId === null) {
    throw new Error(`Request failed: Device ID cannot be null`);
  }

  try {
    const response = await fetch(`${baseURL}device/${deviceId}`, {
      method: "PATCH",
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

    return response;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}

export async function deleteDevice(deviceId: string | null) {
  const accessToken = getAccessToken();

  if (deviceId === null) {
    throw new Error(`Request failed: Device ID cannot be null`);
  }

  try {
    const response = await fetch(`${baseURL}device/${deviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}
