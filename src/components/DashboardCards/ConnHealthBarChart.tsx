import { Box } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { ConnMetrics } from "../../types/dashboard";
import { theme } from "../../styles/theme";

type MetricProp = {
  metric: ConnMetrics;
};

export function ConnHealthBarChart({ metric }: MetricProp) {
  return (
    <Box
      style={{ width: "100%", height: 150, borderTop: theme.borders.default }}
    >
      <ResponsiveContainer>
        <BarChart data={metric.bandwidth.series} margin={{}}>
          <XAxis dataKey="timestamp" fontSize={"10px"} interval={0} />

          <Tooltip
            contentStyle={{
              backgroundColor: theme.bg.tooltip,
              border: theme.borders.subtle,
              borderRadius: "6px",
            }}
            labelStyle={{ color: theme.colors.valueText }}
          />
          <Bar
            dataKey="value"
            fill={theme.colors.accent}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
