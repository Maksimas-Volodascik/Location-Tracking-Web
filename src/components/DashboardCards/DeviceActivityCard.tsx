import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

import { DeviceActivityPieChart } from "./DeviceActivityPieChart";
import { DeviceActivityLineChart } from "./DeviceActivityLineChart";

export function DeviceActivityCard() {
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
          Device Activity Status
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
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", paddingTop: "30px" }}>
        <DeviceActivityPieChart />
        <DeviceActivityLineChart />
      </Box>
    </Card>
  );
}
