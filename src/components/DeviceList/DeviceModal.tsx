import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Divider,
  alpha,
  type SelectChangeEvent,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import DevicesIcon from "@mui/icons-material/Devices";
import type { EmptyDeviceForm } from "../../types/shared";
import { createNewDevice } from "../../services/deviceApi";
import { theme } from "../../styles/theme";

const DEVICE_MODELS = [
  "CustomProtocol",
  "CtmProt",
  "FMC920",
  "FMC630",
  "FMC640",
  "FMC120",
  "FMC130",
  "FMC150",
];

const EMPTY_FORM = {
  imei: "",
  name: "",
  isEnabled: false,
  deviceModelName: "",
} as EmptyDeviceForm;

export default function DeviceModal({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const [form, setForm] = useState<EmptyDeviceForm>(EMPTY_FORM);

  const handleClose = () => setIsOpen(false);

  const handleChange = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleAdd = () => {
    console.log("Device added:", form);
    createNewDevice(form);
    setForm(EMPTY_FORM);
    handleClose();
  };

  const handleClear = () => setForm(EMPTY_FORM);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="device-modal-title"
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "#0000007a",
            backdropFilter: "blur(1px)",
          },
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
          bgcolor: theme.bg.card,
          border: theme.borders.default,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
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
            <DevicesIcon
              sx={{ color: theme.colors.accent, fontSize: theme.fontSize.xl }}
            />
          </Box>
          <Box>
            <Typography
              id="device-modal-title"
              sx={{
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.valueText,
                lineHeight: 1.2,
              }}
            >
              Add Device
            </Typography>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.description,
                mt: 0.2,
              }}
            >
              Fill in the details below to register a new device
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
              IMEI
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 352099001761481"
              value={form.imei}
              onChange={(e) => handleChange("imei", e.target.value)}
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
              Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. FMC650 Device"
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
              Is Enabled ?
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isEnabled}
                  onChange={(e) => handleChange("isEnabled", e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: form.isEnabled ? "#F97316" : "#6B7280",
                  }}
                >
                  {form.isEnabled ? "Enabled" : "Disabled"}
                </Typography>
              }
              sx={{ m: 0 }}
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
              Device Model
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                value={form.deviceModelName}
                onChange={(e: SelectChangeEvent) =>
                  handleChange("deviceModelName", e.target.value)
                }
                sx={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.valueText,
                }}
              >
                {DEVICE_MODELS.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            onClick={handleAdd}
            sx={{
              bgcolor: theme.buttons.primary,
              color: theme.colors.lightText,
              borderRadius: "9px",
              px: 2.5,
              "&:hover": { bgcolor: theme.buttons.primaryHover },
            }}
          >
            Add Device
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
