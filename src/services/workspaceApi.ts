import type { UpdateWorkspaceData, WorkspaceData } from "../types/workspace";
import { getRequest, putRequest } from "./httpClient";

export async function getWorkspaceData(): Promise<WorkspaceData> {
  return getRequest<WorkspaceData>(`workspace`);
}

export async function updateWorkspaceData(
  updateWorkspaceData: UpdateWorkspaceData,
  workspaceId: string,
): Promise<void> {
  return putRequest<void>(`workspace/${workspaceId}`, updateWorkspaceData);
}
