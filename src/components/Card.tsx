import { Card as MuiCard } from "@mui/material";
import type { ReactNode } from "react";
import { theme } from "../styles/theme";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return <MuiCard sx={theme.card}>{children}</MuiCard>;
}
