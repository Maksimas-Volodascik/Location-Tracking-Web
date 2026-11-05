import { Box, Chip, Skeleton, Typography } from "@mui/material";
import { useState, type ReactNode } from "react";
import { Can } from "../components/Can";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { WorkspaceModal } from "../components/workspace/WorkspaceModal";
import { theme } from "../styles/theme";
import type { UpdateWorkspaceData, WorkspaceData } from "../types/workspace";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkspaceData,
  updateWorkspaceData,
} from "../services/workspaceApi";

export function WorkspacePage() {
  const {
    data: workspaceData,
    isLoading,
    isLoadingError,
  } = useQuery<WorkspaceData | null>({
    queryKey: ["workspace"],
    queryFn: getWorkspaceData,
    staleTime: Infinity,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleUpdate = async (form: UpdateWorkspaceData) => {
    if (!workspaceData) return;
    await updateWorkspaceData(form, workspaceData.id);
    queryClient.invalidateQueries({ queryKey: ["workspace"] });
  };

  const status = workspaceData?.isActive
    ? theme.userStatusTheme.online
    : theme.userStatusTheme.offline;

  const fields: { label: string; value: ReactNode }[] = [
    { label: "Name", value: workspaceData?.name },
    { label: "Description", value: workspaceData?.description },
    {
      label: "Status",
      value: workspaceData && (
        <Chip
          label={workspaceData.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{ border: "1px solid", ...status }}
        />
      ),
    },
    {
      label: "Created",
      value:
        workspaceData && new Date(workspaceData.createdAt).toLocaleDateString(),
    },
    { label: "Users", value: workspaceData?.userCount },
    { label: "Devices", value: workspaceData?.deviceCount },
  ];

  return (
    <ContentLayout>
      <Header page="Workspace" tab="Access Control" />
      <Box sx={{ padding: "20px 30px" }}>
        <Card>
          {fields.map((field) => (
            <Box
              key={field.label}
              sx={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: theme.borders.default,
                "&:last-of-type": { borderBottom: "none" },
              }}
            >
              <Typography
                sx={{
                  color: theme.colors.description,
                  fontSize: theme.fontSize.sm,
                }}
              >
                {field.label}
              </Typography>
              <Box
                sx={{
                  color: theme.colors.valueText,
                  fontSize: theme.fontSize.sm,
                }}
              >
                {isLoading ? (
                  <Skeleton variant="text" sx={{ width: "60%" }} />
                ) : isLoadingError ? (
                  <Typography
                    sx={{
                      color: theme.colors.faintDescription,
                      fontSize: theme.fontSize.sm,
                    }}
                  >
                    Failed to load
                  </Typography>
                ) : (
                  field.value
                )}
              </Box>
            </Box>
          ))}
          <Can permission="edit:workspaces">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "12px",
              }}
            >
              <Box sx={{ width: "140px" }}>
                <Button onClick={() => setIsEditModalOpen(true)}>Edit</Button>
              </Box>
            </Box>
          </Can>
        </Card>
      </Box>
      <WorkspaceModal
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onSubmit={handleUpdate}
        initialData={workspaceData}
      />
    </ContentLayout>
  );
}
