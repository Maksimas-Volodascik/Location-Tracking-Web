import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { theme } from "../../../styles/theme";

export function ActionPanel() {
  return (
    <Box
      sx={{
        padding: "12px 16px",
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
        Action
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: theme.colors.description,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
          }}
        >
          Export
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="Export button group"
          sx={{
            border: theme.borders.focusDark,
            borderRadius: "10px",
            alignSelf: "flex-start",
          }}
        >
          {["CSV", "GPX", "JSON"].map((type, index) => (
            <Button
              sx={{
                border: 0,
                color: theme.colors.accent,
                fontSize: theme.fontSize.sm,
                borderLeftWidth: index > 0 ? "1px" : 0,
              }}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
        <Typography
          sx={{
            color: theme.colors.description,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
          }}
        >
          Command
        </Typography>
        <Button
          sx={{
            padding: "5px 12px",
            borderRadius: "3px",
            border: theme.borders.focusDark,
            color: theme.colors.accent,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.semibold,
            alignSelf: "flex-start",
          }}
        >
          Send GPRS command
        </Button>
      </Box>
    </Box>
  );
}
