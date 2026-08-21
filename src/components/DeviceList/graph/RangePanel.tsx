import { Box, Typography } from "@mui/material";
import { theme } from "../../../styles/theme";

const presets = ["24h", "7d", "30d", "Custom"];
const activePreset = "Custom";

export function RangePanel() {
  return (
    <Box
      sx={{
        padding: "12px 16px",
        borderRight: theme.borders.default,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        sx={{
          color: theme.colors.description,
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.bold,
          textTransform: "uppercase",
        }}
      >
        Range
      </Typography>

      <Box
        sx={{ display: "flex", gap: "12px", width: "100%", flexWrap: "wrap" }}
      >
        {["From", "To"].map((label) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                color: theme.colors.label,
                fontSize: theme.fontSize.xs,
              }}
            >
              {label}
            </Typography>

            <Box
              component="input"
              type="datetime-local"
              defaultValue="2026-06-18T08:12"
              sx={{
                background: theme.surface.textBox,
                border: theme.borders.subtle,
                borderRadius: "4px",
                color: theme.colors.valueText,
                fontSize: theme.fontSize.sm,
                fontFamily: "inherit",
                padding: "8px 10px",
                outline: "none",
                colorScheme: "dark",
              }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "6px",
          background: theme.surface.textBox,
          border: theme.borders.default,
          borderRadius: "4px",
          padding: "4px",
          width: "fit-content",
        }}
      >
        {presets.map((preset) => {
          const isActive = preset === activePreset;
          return (
            <Box
              key={preset}
              sx={{
                padding: "5px 12px",
                borderRadius: "3px",
                border: isActive
                  ? theme.borders.focusDark
                  : "1px solid transparent",
                color: isActive
                  ? theme.colors.accent
                  : theme.colors.description,
                fontSize: theme.fontSize.xs,
                fontWeight: theme.fontWeight.semibold,
                userSelect: "none",
              }}
            >
              {preset}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
