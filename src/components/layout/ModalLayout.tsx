import { Modal, Box } from "@mui/material";
import { theme } from "../../styles/theme";

import type { ReactNode } from "react";

type ModalLayoutProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function ModalLayout({ open, onClose, children }: ModalLayoutProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      slotProps={{
        backdrop: {
          sx: { ...theme.modalBlur },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", sm: "480px" },
          bgcolor: theme.surface.card,
          border: theme.borders.default,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
