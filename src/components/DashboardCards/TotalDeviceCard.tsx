import { Typography } from "@mui/material";
import { Card } from "../Card";

export function TotalDeviceCard() {
  return (
    <Card>
      <Typography
        sx={{
          display: "flex",
          color: "#fd8636",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Devices
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          color: "#e2e2e2",
        }}
      >
        148
      </Typography>
      <Typography sx={{ color: "#8a8682", fontSize: "11px" }}>
        Registered Devices
      </Typography>
      <Typography
        sx={{
          marginTop: "14px",
          paddingTop: "14px",
          borderTop: "1px solid #0a0a09",
          color: "#8a8682",
          fontSize: "11px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#e2e2e2" }}>
          127
        </Typography>
        added this week
      </Typography>
    </Card>
  );
}
