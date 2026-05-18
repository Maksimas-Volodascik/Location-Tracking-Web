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
        background: "#1a1917",
        borderRadius: "8px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weeklyData}
          margin={{ top: 5, right: 5, left: 28, bottom: 8 }}
        >
          <CartesianGrid stroke="#2b2b2b" vertical={false} />

          <XAxis
            dataKey="day"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f3f" }}
            tickLine={{ stroke: "#3f3f3f" }}
          />

          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f3f" }}
            tickLine={{ stroke: "#3f3f3f" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #3f3f3f",
              borderRadius: "6px",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#ffffff" }}
          />

          <Line
            type="linear"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#ffffff",
              stroke: "#1a1917",
              strokeWidth: 2,
            }}
            activeDot={{ r: 6, fill: "#ffffff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
