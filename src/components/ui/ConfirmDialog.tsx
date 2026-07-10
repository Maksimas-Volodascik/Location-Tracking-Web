import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  alpha,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { theme } from "../../styles/theme";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{
        backdrop: { sx: { ...theme.modalBlur } },
        paper: {
          sx: {
            bgcolor: theme.surface.card,
            backgroundImage: "none",
            border: theme.borders.default,
            borderRadius: "16px",
            width: { xs: "90vw", sm: "400px" },
          },
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "9px",
              bgcolor: alpha(theme.buttons.danger, 0.15),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberIcon
              sx={{ color: theme.buttons.danger, fontSize: theme.fontSize.xl }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.valueText,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 0 }}>
        <Typography
          sx={{ fontSize: theme.fontSize.xs, color: theme.colors.description }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2.5 }}>
        <Button
          onClick={onCancel}
          sx={{
            color: theme.colors.label,
            borderRadius: "9px",
            textTransform: "none",
            "&:hover": {
              borderColor: theme.buttons.primary,
              color: theme.buttons.primary,
              backgroundColor: theme.buttons.secondaryHover,
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onCancel();
          }}
          sx={{
            bgcolor: theme.buttons.danger,
            color: theme.colors.lightText,
            borderRadius: "9px",
            px: 2.5,
            textTransform: "none",
            "&:hover": { bgcolor: theme.buttons.danger, opacity: 0.85 },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
