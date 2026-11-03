import { Box, Chip, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Can } from "../components/Can";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { theme } from "../styles/theme";
import type { WorkspaceData } from "../types/workspace";

// mock data until the workspace api exists
const WorkspaceJson: WorkspaceData = {
  name: "Northern Fleet",
  description: "Delivery vehicles operating across the northern region.",
  isActive: true,
  createdAt: "2026-03-14T09:30:00Z",
  userCount: 12,
  deviceCount: 48,
};

export function WorkspacePage() {
  const workspace = WorkspaceJson;
  const status = workspace.isActive
    ? theme.userStatusTheme.online
    : theme.userStatusTheme.offline;

  const fields: { label: string; value: ReactNode }[] = [
    { label: "Name", value: workspace.name },
    { label: "Description", value: workspace.description },
    {
      label: "Status",
      value: (
        <Chip
          label={workspace.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{ border: "1px solid", ...status }}
        />
      ),
    },
    {
      label: "Created",
      value: new Date(workspace.createdAt).toLocaleDateString(),
    },
    { label: "Users", value: workspace.userCount },
    { label: "Devices", value: workspace.deviceCount },
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
                {field.value}
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
                {/* no edit flow yet, button is display only */}
                <Button onClick={() => {}}>Edit</Button>
              </Box>
            </Box>
          </Can>
        </Card>
      </Box>
    </ContentLayout>
  );
}
