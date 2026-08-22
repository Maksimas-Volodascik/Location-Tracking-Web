import { Box, Paper, Typography } from "@mui/material";
import { useRef, type ReactNode } from "react";
import Draggable from "react-draggable";

type DraggableWindowProps = {
  open: boolean;
  children: ReactNode;
  headerName?: string;
};

export function DraggableWindow({
  open,
  headerName = "Drag Me",
  children,
}: DraggableWindowProps) {
  if (!open) {
    return null;
  }

  const nodeRef = useRef(null);

  return (
    <Draggable handle=".window-title" nodeRef={nodeRef}>
      <Paper
        ref={nodeRef}
        elevation={8}
        sx={{
          position: "fixed",
          top: 100,
          left: 100,
          width: 600,
          zIndex: 1300,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Box
          className="window-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            py: 0.5,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            cursor: "move",
          }}
        >
          <Typography variant="subtitle2">{headerName}</Typography>
        </Box>
        {children}
      </Paper>
    </Draggable>
  );
}
