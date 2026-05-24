import { Card as MuiCard } from "@mui/material";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <MuiCard
      sx={{
        background: "#1a1917",
        border: "1px solid #3f3f3f",
        borderRadius: 1,
        position: "relative",
        padding: "20px",
      }}
    >
      {children}
    </MuiCard>
  );
}
