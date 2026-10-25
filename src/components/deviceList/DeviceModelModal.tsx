import { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  alpha,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MemoryIcon from "@mui/icons-material/Memory";
import type {
  DeviceModelData,
  DeviceModelForm,
} from "../../types/deviceModels";
import { theme } from "../../styles/theme";
import { useDeviceModelForm } from "../../hooks/useDeviceModelForm";
import { ModalLayout } from "../layout/ModalLayout";

interface DeviceModelModalProps {
  open: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit: (form: DeviceModelForm, deviceModelId: string | null) => void;
  initialData?: DeviceModelData | null;
}

export function DeviceModelModal({
  open,
  setIsOpen,
  onSubmit,
  initialData,
}: DeviceModelModalProps) {
  const isEditMode = !!initialData;
  const { form, handleChange, handleClear } = useDeviceModelForm({
    initialData,
  });

  useEffect(() => {
    if (open) {
      handleClear();
    }
  }, [open, handleClear]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    onSubmit(form, initialData ? initialData.id : null);
    handleClose();
  };

  return (
    <ModalLayout onClose={() => setIsOpen(false)} open={open}>
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: theme.borders.default,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "9px",
            bgcolor: alpha(theme.colors.accent, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MemoryIcon
            sx={{ color: theme.colors.accent, fontSize: theme.fontSize.xl }}
          />
        </Box>
        <Box>
          <Typography
            id="device-model-modal-title"
            sx={{
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.valueText,
              lineHeight: 1.2,
            }}
          >
            {isEditMode ? "Edit Device Model" : "Add Device Model"}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.description,
              mt: 0.2,
            }}
          >
            {isEditMode
              ? "Update the details for this device model"
              : "Fill in the details below to register a new device model"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              width: 140,
              fontSize: theme.fontSize.sm,
              color: theme.colors.label,
              flexShrink: 0,
            }}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="My Custom Model"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={{ "& input": { fontSize: theme.fontSize.sm } }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              width: 140,
              fontSize: theme.fontSize.sm,
              color: theme.colors.label,
              flexShrink: 0,
            }}
          >
            Protocol Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="FMC650"
            value={form.protocolName}
            onChange={(e) => handleChange("protocolName", e.target.value)}
            sx={{ "& input": { fontSize: theme.fontSize.sm } }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Typography
            sx={{
              width: 140,
              fontSize: theme.fontSize.sm,
              color: theme.colors.label,
              flexShrink: 0,
              pt: 1,
            }}
          >
            Description
          </Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={3}
            placeholder="Short description of this device model"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            sx={{ "& textarea": { fontSize: theme.fontSize.sm } }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: theme.borders.default }} />
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClear}
          sx={{
            border: theme.borders.default,
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
          Clear
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            bgcolor: theme.buttons.primary,
            color: theme.colors.lightText,
            borderRadius: "9px",
            px: 2.5,
            "&:hover": { bgcolor: theme.buttons.primaryHover },
          }}
        >
          {isEditMode ? "Save Changes" : "Add Device Model"}
        </Button>
      </Box>
    </ModalLayout>
  );
}
