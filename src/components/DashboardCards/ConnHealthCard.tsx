import { Box, Typography } from "@mui/material";
import { Card } from "../Card";
import type { ConnMetrics } from "../../types/dashboard";
import { formatLable } from "../../utils";
import { ConnHealthBarChart } from "./ConnHealthBarChart";
import { theme } from "../../styles/theme";

type MetricProp = {
  metric: ConnMetrics;
};

export function ConnHealthCard({ metric }: MetricProp) {
  return (
    <Card>
      <Box>
        <Typography
          sx={{
            fontSize: theme.fontSize.base,
            color: theme.colors.accent,
            fontWeight: theme.fontWeight.bold,
          }}
        >
          Connection Health
        </Typography>
        <Typography
          sx={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.description,
            fontWeight: theme.fontWeight.bold,
          }}
        >
          Across all registered devices
        </Typography>

        <Box sx={{ marginTop: "24px", display: "grid", gap: "10px" }}>
          {metric?.latency &&
            Object.entries(metric.latency).map(([key, value]) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "30px",
                }}
                key={key}
              >
                <Typography
                  sx={{
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.description,
                    fontWeight: theme.fontWeight.bold,
                  }}
                >
                  {formatLable(key)}:
                </Typography>

                <Typography
                  sx={{
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: theme.borders.default,
            marginTop: "20px",
            marginBottom: "15px",
            paddingTop: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.description,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            Active connections:
          </Typography>

          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
              marginRight: "30px",
            }}
          >
            {metric.connections.active}
          </Typography>
        </Box>
        <ConnHealthBarChart metric={metric} />
      </Box>
    </Card>
  );
}
