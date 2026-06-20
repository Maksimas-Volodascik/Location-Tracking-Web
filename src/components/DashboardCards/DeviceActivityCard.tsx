import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

import { DeviceActivityPieChart } from "./DeviceActivityPieChart";
import { DeviceActivityLineChart } from "./DeviceActivityLineChart";
import { theme } from "../../styles/theme";

export function DeviceActivityCard() {
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
          Device Activity Status
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
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", paddingTop: "30px" }}>
        <DeviceActivityPieChart />
        <DeviceActivityLineChart />
      </Box>
    </Card>
  );
}
