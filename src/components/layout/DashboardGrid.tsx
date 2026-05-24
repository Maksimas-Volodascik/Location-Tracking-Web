import { Box } from "@mui/material";
import type { ReactNode } from "react";

type DashboardProps = {
  children: ReactNode;
  gridTemplate: string;
  padding: string;
};

export function DashboardGrid({
  children,
  gridTemplate,
  padding,
}: DashboardProps) {
  return (
    <Box
      sx={{
        padding: padding,
        display: "grid",
        gridTemplateColumns: gridTemplate,
        gap: "14px",
      }}
    >
      {children}
    </Box>
  );
}
