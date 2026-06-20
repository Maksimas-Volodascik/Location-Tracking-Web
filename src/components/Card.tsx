import { Card as MuiCard } from "@mui/material";
import type { ReactNode } from "react";
import { theme } from "../styles/theme";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <MuiCard
      sx={{
        background: theme.bg.card,
        border: theme.borders.subtle,
        borderRadius: 1,
        position: "relative",
        padding: "20px",
      }}
    >
      {children}
    </MuiCard>
  );
}
