import type { WorkspaceData } from "../types/workspace";
import { getRequest } from "./httpClient";

export async function getWorkspaceData(): Promise<WorkspaceData> {
  return getRequest<WorkspaceData>(`workspace`);
}
