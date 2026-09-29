import { Box, Typography } from "@mui/material";
import { theme } from "../../../styles/theme";

export const SelectionPanel = () => {
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
        Selection
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "36px",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: theme.colors.valueText,
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            61
          </Typography>
          <Typography
            sx={{
              color: theme.colors.label,
              fontSize: theme.fontSize.xs,
              textTransform: "uppercase",
            }}
          >
            Records
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: theme.colors.valueText,
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            9
          </Typography>
          <Typography
            sx={{
              color: theme.colors.label,
              fontSize: theme.fontSize.xs,
              textTransform: "uppercase",
            }}
          >
            Events
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: theme.colors.valueText,
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            92 km/h
          </Typography>
          <Typography
            sx={{
              color: theme.colors.label,
              fontSize: theme.fontSize.xs,
              textTransform: "uppercase",
            }}
          >
            Max Speed
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "36px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            padding: "5px 12px",
            borderRadius: "3px",
            border: theme.borders.focusDark,
            color: theme.colors.accent,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.semibold,
            userSelect: "none",
          }}
        >
          Codec 8E
        </Typography>
      </Box>
    </Box>
  );
};
