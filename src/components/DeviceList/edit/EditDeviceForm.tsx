import {
  alpha,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { theme } from "../../../styles/theme";
import ClearIcon from "@mui/icons-material/Clear";
import DevicesIcon from "@mui/icons-material/Devices";
import SaveIcon from "@mui/icons-material/Save";
import BadgeIcon from "@mui/icons-material/Badge";
import TuneIcon from "@mui/icons-material/Tune";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDeviceForm } from "../../../hooks/useDeviceForm";
import type { DeviceData } from "../../../types/device";

interface EditDeviceProps {
  initialData?: DeviceData | null;
}
const DEVICE_MODELS = [
  "CustomProtocol",
  "CtmProt",
  "FMC650",
  "FMC630",
  "FMC640",
  "FMC120",
  "FMC130",
  "FMC150",
];

export function EditDeviceForm({ initialData }: EditDeviceProps) {
  const { form, handleChange, handleClear } = useDeviceForm({
    initialData,
  });

  const handleSubmit = () => {};

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        width: "100%",
        maxWidth: "760px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "12px",
            bgcolor: alpha(theme.colors.accent, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <DevicesIcon
            sx={{ color: theme.colors.accent, fontSize: theme.fontSize["2xl"] }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: theme.fontSize.xl,
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.valueText,
            lineHeight: 1.2,
          }}
        >
          Edit Device
        </Typography>
        <Typography
          sx={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.description,
          }}
        >
          Update the details for this device.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: theme.surface.card,
          border: theme.borders.default,
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            borderBottom: theme.borders.default,
            bgcolor: theme.surface.drawer,
          }}
        >
          <BadgeIcon
            sx={{
              color: theme.colors.accent,
              fontSize: theme.fontSize.base,
            }}
          />
          <Typography
            sx={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.valueText,
            }}
          >
            Identification
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2.5,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.label,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                mb: 0.75,
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.surface.textBox,
                  borderRadius: "10px",
                },
                "& input": { fontSize: theme.fontSize.sm },
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.label,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                mb: 0.75,
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.surface.textBox,
                  borderRadius: "10px",
                },
                "& input": { fontSize: theme.fontSize.sm },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: theme.surface.card,
          border: theme.borders.default,
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            borderBottom: theme.borders.default,
            bgcolor: theme.surface.drawer,
          }}
        >
          <TuneIcon
            sx={{
              color: theme.colors.accent,
              fontSize: theme.fontSize.base,
            }}
          />
          <Typography
            sx={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.valueText,
            }}
          >
            Configuration
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.label,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                mb: 0.75,
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
                  bgcolor: theme.surface.textBox,
                  borderRadius: "10px",
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: 2,
              borderRadius: "10px",
              bgcolor: theme.surface.listItem,
              border: theme.borders.listItemBorder,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.valueText,
                }}
              >
                Device state
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.fontSize.xs,
                  color: theme.colors.description,
                  mt: 0.3,
                }}
              >
                Disabled devices stop accepting incoming records.
              </Typography>
            </Box>
            <Switch
              checked={form.isEnabled}
              onChange={(e) => handleChange("isEnabled", e.target.checked)}
              size="small"
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
          px: 2.5,
          py: 2,
          borderRadius: "14px",
          bgcolor: theme.surface.drawer,
          border: theme.borders.default,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
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
          Import
        </Button>
        <Box sx={{ display: "flex", gap: 1.5 }}>
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
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            sx={{
              bgcolor: theme.buttons.primary,
              color: theme.colors.lightText,
              borderRadius: "9px",
              px: 2.5,
              textTransform: "none",
              "&:hover": { bgcolor: theme.buttons.primaryHover },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
