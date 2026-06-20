import { Button as MuiButton } from "@mui/material";
import type { ReactNode } from "react";
import { theme } from "../styles/theme";

type ButtonProps = {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      onClick={onClick}
      sx={{
        width: "100%",
        height: "50px",
        borderRadius: "10px",
        color: theme.colors.contrastText,
        fontWeight: theme.fontWeight.bold,
        fontSize: theme.fontSize.sm,
        background: theme.buttons.primary,
        marginTop: 1,
        "&:hover": {
          backgroundColor: theme.buttons.primaryHover,
        },
      }}
    >
      {children}
    </MuiButton>
  );
}
