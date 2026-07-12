import type { MetricCardData, MetricEntry } from "../types/dashboard";
import { baseURL } from "./api";
import { getAccessToken } from "./tokenService";

export async function getMetricData(): Promise<MetricEntry[] | null> {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${baseURL}dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as MetricCardData;

    const result: MetricEntry[] = Object.entries(data).map(
      ([category, value]) => {
        return {
          category,
          value,
        };
      },
    );

    return result;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
