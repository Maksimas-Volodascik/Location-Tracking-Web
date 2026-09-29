import { Box } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { theme } from "../../styles/theme";

const weeklyData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 67 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 81 },
];

export function DeviceActivityLineChart() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 340,
        background: theme.surface.card,
        borderRadius: "8px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weeklyData}
          margin={{ top: 5, right: 5, left: 28, bottom: 8 }}
        >
          <CartesianGrid stroke={theme.chart.gridStroke} vertical={false} />

          <XAxis
            dataKey="day"
            tick={{ fill: theme.chart.tickText, fontSize: theme.fontSize.xs }}
            axisLine={{ stroke: theme.chart.axisLine }}
            tickLine={{ stroke: theme.chart.tickLine }}
          />

          <YAxis
            tick={{ fill: theme.chart.tickText, fontSize: theme.fontSize.xs }}
            axisLine={{ stroke: theme.chart.axisLine }}
            tickLine={{ stroke: theme.chart.tickLine }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: theme.surface.tooltip,
              border: theme.borders.subtle,
              borderRadius: "6px",
            }}
            labelStyle={{ color: theme.colors.valueText }}
          />

          <Line
            type="linear"
            dataKey="value"
            stroke={theme.colors.accent}
            strokeWidth={3}
            dot={{
              r: 4,
              fill: theme.chart.dot.fill,
              stroke: theme.chart.dot.stroke,
              strokeWidth: 2,
            }}
            activeDot={{ r: 6, fill: theme.chart.dot.fill }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
