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
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha,
  type SelectChangeEvent,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import DevicesIcon from "@mui/icons-material/Devices";
import type { EmptyDeviceForm } from "../../types/shared";
import { createNewDevice } from "../../services/deviceApi";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F97316" }, // orange-500
    background: {
      default: "#0F0F0F",
      paper: "#1A1A1A",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#9CA3AF",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderColor: "#3A3A3A" },
          "&:hover fieldset": { borderColor: "#F97316 !important" },
          "&.Mui-focused fieldset": { borderColor: "#F97316 !important" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9CA3AF",
          "&.Mui-focused": { color: "#F97316" },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: "#F97316" },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": { color: "#F97316" },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#F97316",
          },
        },
      },
    },
  },
});

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
    handleClose();
  };

  const handleClear = () => setForm(EMPTY_FORM);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
            bgcolor: "#1A1A1A",
            border: "1px solid #2E2E2E",
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
              borderBottom: "1px solid #2A2A2A",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "9px",
                bgcolor: alpha("#F97316", 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DevicesIcon sx={{ color: "#F97316", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                id="device-modal-title"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#F5F5F5",
                  lineHeight: 1.2,
                }}
              >
                Add Device
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "#6B7280", mt: 0.2 }}
              >
                Fill in the details below to register a new device
              </Typography>
            </Box>
          </Box>

          {/* Form Body */}
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
                  fontSize: "0.825rem",
                  color: "#9CA3AF",
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
                sx={{ "& input": { fontSize: "0.875rem" } }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  width: 140,
                  fontSize: "0.825rem",
                  color: "#9CA3AF",
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
                sx={{ "& input": { fontSize: "0.875rem" } }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  width: 140,
                  fontSize: "0.825rem",
                  color: "#9CA3AF",
                  flexShrink: 0,
                }}
              >
                Is Enabled ?
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isEnabled}
                    onChange={(e) =>
                      handleChange("isEnabled", e.target.checked)
                    }
                    size="small"
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "0.825rem",
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
                  fontSize: "0.825rem",
                  color: "#9CA3AF",
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
                  sx={{ fontSize: "0.875rem", color: "white" }}
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

          <Divider sx={{ borderColor: "#2A2A2A" }} />
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
                borderColor: "#3A3A3A",
                color: "#9CA3AF",
                borderRadius: "9px",
                textTransform: "none",

                "&:hover": {
                  borderColor: "#F97316",
                  color: "#F97316",
                  backgroundColor: "#f9741618",
                },
              }}
            >
              Clear
            </Button>
            <Button
              onClick={handleAdd}
              sx={{
                bgcolor: "#F97316",
                color: "#fff",
                borderRadius: "9px",
                px: 2.5,
                "&:hover": { bgcolor: "#EA6C0A" },
              }}
            >
              Add Device
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
