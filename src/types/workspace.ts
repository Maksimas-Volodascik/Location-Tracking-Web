export type WorkspaceData = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  userCount: number;
  deviceCount: number;
};

export type UpdateWorkspaceData = {
  name: string;
  description: string;
};

export const EMPTY_WORKSPACE_FORM: UpdateWorkspaceData = {
  name: "",
  description: "",
};

export function toWorkspaceForm(workspace: WorkspaceData): UpdateWorkspaceData {
  return {
    name: workspace.name,
    description: workspace.description,
  };
}
