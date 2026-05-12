import { Box } from "@mui/material";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageProps) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "#111111",
      }}
    >
      {children}
    </Box>
  );
}
