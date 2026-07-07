import { createTheme } from "@mui/material";

export const theme = {
  //Text
  colors: {
    accent: "#fd8636",
    valueText: "#e2e2e2",
    description: "#8a8682",
    faintDescription: "#8a868270",
    label: "#9CA3AF",
    contrastText: "#000000",
    lightText: "#ffffff",
  },

  //Buttons
  buttons: {
    primary: "#fd8636",
    primaryHover: "#ffa061",
    secondary: "#2a2a2a",
    secondaryHover: "#fd86360f",
    danger: "#ff5353",
    success: "#8dff89",
    warning: "#D97706",
    info: "#2563EB",
    purple: "#7C3AED",
  },

  //Charts
  chart: {
    tickText: "#9ca3af",
    tickLine: "#3f3f3f",
    axisLine: "#3f3f3f",
    gridStroke: "#444444",
    dot: { fill: "#ffffff", stroke: "#1a1917" },

    series: {
      online: "#e24646",
      offline: "#ec7424",
      never: "#413c35",
    },

    seriesColors: ["#e24646", "#ec7424", "#413c35"],
  },

  //Background
  bg: {
    page: "#0e0e10",
    card: "#1a1917",
    cardHover: "#cccccc2a",
    tooltip: "#1f1f1f",
    drawer: "#141412",
    listItem: "#18181b",
  },

  //Card/Table/Form Borders
  borders: {
    strong: "1px solid #0a0a09",
    subtle: "1px solid #3f3f3f",
    default: "1px solid #2e2e2b",
    primary: "2px solid #1e1e1e",
    focus: "2px solid #fd8636",
    focusDark: "1px solid #fd863680",
    listItemBorder: "1px solid #ffffff0f",
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  fontWeight: {
    normal: "400" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const themeTemplate = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": { color: theme.colors.accent },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: theme.colors.accent,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: theme.colors.valueText,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.faintDescription,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.description,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.accent,
          },
        },
      },
    },
  },
});
