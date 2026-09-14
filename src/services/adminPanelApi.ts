import type { LogEntry } from "../types/admin";
import { getRequest } from "./httpClient";

export async function getAllLogEntries(): Promise<LogEntry[]> {
  return getRequest<LogEntry[]>("logentry");
}
