import { Box, Button, ButtonGroup, Slider, Typography } from "@mui/material";
import { theme } from "../../../styles/theme";
import { useState } from "react";

export function EventsPanel() {
  const events = [
    "Ignition",
    "Overspeed",
    "Harsh driving",
    "Idling",
    "Geofence",
  ];
  const ignitionModes = ["All", "Ignition on", "Off"];
  const [activeMode, setActiveMode] = useState("All");

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
        Events
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {events.map((event) => (
            <Button
              sx={{
                border: theme.borders.focusDark,
                borderRadius: "10px",
                color: theme.colors.accent,
                fontSize: theme.fontSize.sm,
                minWidth: 0,
              }}
            >
              {event}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: "45%",
          }}
        >
          <Typography
            sx={{
              color: theme.colors.description,
              fontSize: theme.fontSize.xs,
            }}
          >
            Min speed{" "}
            <Box component="span" sx={{ color: theme.colors.accent }}>
              0 km/h
            </Box>
          </Typography>

          <Slider
            defaultValue={0}
            sx={{
              color: theme.colors.accent,
              padding: "10px 0",
              "& .MuiSlider-rail": {
                backgroundColor: theme.colors.faintDescription,
              },
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: theme.colors.valueText,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "4px",
            background: theme.surface.textBox,
            border: theme.borders.default,
            borderRadius: "4px",
            padding: "4px",
            marginBottom: "10px",
          }}
        >
          {ignitionModes.map((mode) => {
            const isActive = activeMode === mode;
            return (
              <Button
                key={mode}
                onClick={() => setActiveMode(mode)}
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
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {mode}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
