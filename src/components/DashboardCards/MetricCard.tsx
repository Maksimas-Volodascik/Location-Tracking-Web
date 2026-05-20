import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

type UsersKPI = {
  total: number;
  admin: number;
  users: number;
};

type RecordsKPI = {
  total: number;
  daily: number;
};

type DevicesKPI = {
  total: number;
  weekly: number;
};

type ErrorsKPI = {
  total: number;
  weekly: number;
};

type CardViewMap = {
  users: {
    metricLabel: string;
    description: (kpi: UsersKPI) => React.ReactNode;
  };
  records: {
    metricLabel: string;
    description: (kpi: RecordsKPI) => React.ReactNode;
  };
  devices: {
    metricLabel: string;
    description: (kpi: DevicesKPI) => React.ReactNode;
  };
  errors: {
    metricLabel: string;
    description: (kpi: ErrorsKPI) => React.ReactNode;
  };
};

type MetricCardProps = {
  cardType: string;
  kpiValues: DevicesKPI | ErrorsKPI | UsersKPI | RecordsKPI;
};

const cardView: CardViewMap = {
  users: {
    metricLabel: "Total users with access",
    description: (kpi: UsersKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.admin}
        </Box>{" "}
        admins -{" "}
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.users}
        </Box>{" "}
        users
      </>
    ),
  },
  records: {
    metricLabel: "Records received this month",
    description: (kpi: RecordsKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.daily}{" "}
        </Box>
        in last 24hours
      </>
    ),
  },
  devices: {
    metricLabel: "Total registered devices",
    description: (kpi: DevicesKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.weekly}{" "}
        </Box>
        devices added in the past week
      </>
    ),
  },
  errors: {
    metricLabel: "Errors",
    description: (kpi: ErrorsKPI) => (
      <>
        <Box component="span" sx={{ color: "#e2e2e2" }}>
          {kpi.weekly}{" "}
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
        {kpiValues.total}
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
