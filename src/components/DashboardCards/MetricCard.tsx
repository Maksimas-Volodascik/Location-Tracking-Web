import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

type UsersKPI = {
  Total: number;
  Admin: number;
  Users: number;
};

type RecordsKPI = {
  Total: number;
  DailyRecords: number;
};

type DevicesKPI = {
  Total: number;
  WeeklyDevices: number;
};

type ErrorsKPI = {
  Total: number;
  WeeklyErrors: number;
};

type CardViewMap = {
  Users: {
    metricLabel: string;
    description: (kpi: UsersKPI) => React.ReactNode;
  };
  Records: {
    metricLabel: string;
    description: (kpi: RecordsKPI) => React.ReactNode;
  };
  Devices: {
    metricLabel: string;
    description: (kpi: DevicesKPI) => React.ReactNode;
  };
  Errors: {
    metricLabel: string;
    description: (kpi: ErrorsKPI) => React.ReactNode;
  };
};

type MetricCardProps = {
  cardType: string;
  kpiValues: DevicesKPI | ErrorsKPI | UsersKPI | RecordsKPI;
};

const cardView: CardViewMap = {
  Users: {
    metricLabel: "Total users with access",
    description: (kpi: UsersKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.Admin}
        </Box>{" "}
        admins -{" "}
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.Users}
        </Box>{" "}
        users
      </>
    ),
  },
  Records: {
    metricLabel: "Records received this month",
    description: (kpi: RecordsKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.DailyRecords}{" "}
        </Box>
        in last 24hours
      </>
    ),
  },
  Devices: {
    metricLabel: "Total registered devices",
    description: (kpi: DevicesKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.WeeklyDevices}{" "}
        </Box>
        devices added in the past week
      </>
    ),
  },
  Errors: {
    metricLabel: "Errors",
    description: (kpi: ErrorsKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.WeeklyErrors}{" "}
        </Box>
        errors in the past week
      </>
    ),
  },
};

export function MetricCard({ cardType, kpiValues }: MetricCardProps) {
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
        {cardType}
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          color: "#e2e2e2",
        }}
      >
        {kpiValues.Total}
      </Typography>
      <Typography sx={{ color: "#8a8682", fontSize: "11px" }}>
        {cardView[cardType as keyof typeof cardView].metricLabel}
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
        {cardView[cardType as keyof typeof cardView].description(
          kpiValues as any,
        )}
      </Typography>
    </Card>
  );
}
