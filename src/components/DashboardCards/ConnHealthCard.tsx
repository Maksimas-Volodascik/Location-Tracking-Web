import { Box, Typography } from "@mui/material";
import { Card } from "../Card";
import type { ConnMetrics } from "../../types/dashboard";
import { useState } from "react";
import { formatLable } from "../../utils";

type MetricProp = {
  metric: ConnMetrics;
};

export function ConnHealthCard({ metric }: MetricProp) {
  return (
    <Card>
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#fd8636",
            fontWeight: "bold",
          }}
        >
          Connection Health
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#8a8580",
            fontWeight: "bold",
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
                    fontSize: "12px",
                    color: "#8a8580",
                    fontWeight: "bold",
                  }}
                >
                  {formatLable(key)}:
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#e2e2e2",
                    fontWeight: "bold",
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
            borderTop: "1px solid #0a0a09",
            marginTop: "20px",
            paddingTop: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",

              color: "#8a8580",
              fontWeight: "bold",
            }}
          >
            Active connections:
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#e2e2e2",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            {metric.connections.active}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
