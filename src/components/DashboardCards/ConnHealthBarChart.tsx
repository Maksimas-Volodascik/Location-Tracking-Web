import { Box } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { ConnMetrics } from "../../types/dashboard";

type MetricProp = {
  metric: ConnMetrics;
};

export function ConnHealthBarChart({ metric }: MetricProp) {
  return (
    <Box style={{ width: "100%", height: 150, borderTop: "1px solid #0a0a09" }}>
      <ResponsiveContainer>
        <BarChart data={metric.bandwidth.series} margin={{}}>
          <XAxis dataKey="timestamp" fontSize={"10px"} interval={0} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #3f3f3f",
              borderRadius: "6px",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#ffffff" }}
          />
          <Bar dataKey="value" fill="#fd8636" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
