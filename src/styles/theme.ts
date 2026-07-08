import { createTheme } from "@mui/material";

const chartSeries = {
  online: "#e24646",
  offline: "#ec7424",
  never: "#413c35",
};

const roleTheme: Record<
  string,
  { color: string; bgcolor: string; borderColor: string }
> = {
  admin: {
    color: "#c3b6dd",
    bgcolor: "#651dff43",
    borderColor: "#9684be3d",
  },
  user: { color: "#a1a1aa", bgcolor: "#26262a", borderColor: "#ffffff12" },
};

const userStatusTheme = {
  online: { color: "#29df90", bgcolor: "#5aa58524", borderColor: "#10da834f" },
  offline: { color: "#71717a", bgcolor: "#26262a", borderColor: "#ffffff12" },
};

const colors = {
  accent: "#fd8636",
  valueText: "#ebebeb",
  description: "#8a8682",
  faintDescription: "#8a868270",
  label: "#9CA3AF",
  contrastText: "#000000",
  lightText: "#ffffff",
};

const buttons = {
  primary: "#fd8636",
  primaryHover: "#ffa061",
  secondary: "#2a2a2a",
  secondaryHover: "#fd86360f",
  danger: "#ff5353",
  success: "#8dff89",
  warning: "#D97706",
  info: "#2563EB",
  purple: "#7C3AED",
};

const surface = {
  page: "#0e0e10",
  card: "#1a1917",
  cardHover: "#cccccc2a",
  tooltip: "#1f1f1f",
  drawer: "#141412",
  listItem: "#18181b",
  listItemHover: "#1f1f23",
  textBox: "#1a1a1e",
  avatar: "#3f3f46",
};

const borders = {
  strong: "1px solid #0a0a09",
  subtle: "1px solid #3f3f3f",
  default: "1px solid #2e2e2b",
  primary: "2px solid #1e1e1e",
  focus: "2px solid #fd8636",
  focusDark: "1px solid #fd863680",
  listItemBorder: "1px solid #ffffff0f",
};

const chart = {
  tickText: "#9ca3af",
  tickLine: "#3f3f3f",
  axisLine: "#3f3f3f",
  gridStroke: "#444444",
  dot: { fill: "#ffffff", stroke: "#1a1917" },

  series: chartSeries,
  seriesColors: Object.values(chartSeries),
};

const card = {
  background: surface.card,
  border: borders.subtle,
  borderRadius: 1,
  position: "relative",
  padding: "20px",
};

const sidebar = {
  background: surface.card,
  border: borders.default,
  text: colors.valueText,
  mutedText: colors.description,
  borderWidth: "0px 2px 0px 0px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const navbar = {
  background: surface.page,
  border: borders.default,
};

const footer = {
  background: surface.card,
  itemBackground: surface.listItem,
  border: borders.subtle,
  accent: colors.accent,
};

const listItem = {
  bgcolor: surface.listItem,
  border: borders.listItemBorder,
  "&:hover": {
    bgcolor: surface.listItemHover,
  },
  "&:active": {
    transform: "scale(0.98)",
  },
  transition: "all 120ms ease",
};

const modalBlur = {
  bgcolor: "#0000007a",
  backdropFilter: "blur(1px)",
};

const tooltip = {
  background: surface.tooltip,
  border: borders.subtle,
  borderRadius: "6px",
};

const drawer = {
  "& .MuiDrawer-paper": {
    background: surface.drawer,
    borderLeft: borders.default,
    width: "320px",
    position: "relative",
  },
};

export const theme = {
  colors,
  buttons,
  surface,
  borders,
  chart,

  roleTheme,
  userStatusTheme,

  card,
  sidebar,
  navbar,
  footer,
  listItem,
  modalBlur,
  tooltip,
  drawer,

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
