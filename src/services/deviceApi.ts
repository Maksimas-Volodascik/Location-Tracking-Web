import { BASE_URL, type DeviceData } from "../types/shared";
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
    return null;
  }
}
