import { Box } from "@mui/material";
import type { ReactNode } from "react";

type AuthProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        mr: "10%",
      }}
    >
      {children}
    </Box>
  );
}
