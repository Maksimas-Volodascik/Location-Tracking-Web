import { Box } from "@mui/material";
import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
};

export function ContentLayout({ children }: ContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
