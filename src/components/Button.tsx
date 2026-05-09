import { Button as MuiButton } from "@mui/material";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      sx={{
        marginTop: 1,
        backgroundColor: "#ff7d13",
        color: "#000",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "#db6a00",
        },
      }}
    >
      {children}
    </MuiButton>
  );
}
