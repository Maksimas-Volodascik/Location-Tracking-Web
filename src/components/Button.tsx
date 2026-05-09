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
        width: "100%",
        height: "50px",
        borderRadius: "10px",
        color: "#000",
        fontWeight: 700,
        fontSize: "14px",
        background:
          "linear-gradient(170deg,rgba(253, 134, 54, 0.55) 0%,rgba(253, 134, 54, 0.35) 18%,    rgba(253, 134, 54, 0.15) 22%,    rgba(255, 170, 110, 0.15) 35%, rgba(253, 134, 54, 0.45) 38%, rgba(255, 210, 180, 0.10) 55%, rgba(253, 134, 54, 0.25) 70%, rgba(253, 134, 54, 0.55) 85%, rgba(253, 134, 54, 0.35) 100%),  linear-gradient(45deg,rgba(255, 235, 220, 0.6) 0%,rgba(255, 200, 150, 0.45) 45%,rgba(253, 134, 54, 0.55) 55%,rgba(253, 134, 54, 0.75) 100%) #ffe6d6",
        marginTop: 1,
        "&:hover": {
          backgroundColor: "#753205",
        },
      }}
    >
      {children}
    </MuiButton>
  );
}
