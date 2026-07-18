import type { MetricCardData, MetricEntry } from "../types/dashboard";
import { getRequest } from "./httpClient";

export async function getMetricData(): Promise<MetricEntry[]> {
  const data = await getRequest<MetricCardData>("dashboard");

  return Object.entries(data).map(([category, value]) => ({
    category,
    value,
  }));
}
