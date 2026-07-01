import { Box } from "@mui/material";
import type { ReactNode } from "react";

type ContentProps = {
  overflow?: string;
  children: ReactNode;
};

export function ContentLayout({ overflow = "auto", children }: ContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: overflow,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
