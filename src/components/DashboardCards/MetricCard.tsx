import { Box, Typography } from "@mui/material";
import { Card } from "../Card";
import { theme } from "../../styles/theme";

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
        <Box component="span" sx={{ color: theme.colors.valueText }}>
          {kpi.admin}
        </Box>{" "}
        admins -{" "}
        <Box component="span" sx={{ color: theme.colors.valueText }}>
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
        <Box component="span" sx={{ color: theme.colors.valueText }}>
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
        <Box component="span" sx={{ color: theme.colors.valueText }}>
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
        <Box component="span" sx={{ color: theme.colors.valueText }}>
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
          color: theme.colors.accent,
          fontWeight: theme.fontWeight.bold,
          marginBottom: "16px",
        }}
      >
        {cardType}
      </Typography>
      <Typography
        sx={{
          fontSize: theme.fontSize["3xl"],
          fontWeight: theme.fontWeight.bold,
          letterSpacing: "0.5px",
          color: theme.colors.valueText,
        }}
      >
        {kpiValues.total}
      </Typography>
      <Typography
        sx={{ color: theme.colors.description, fontSize: theme.fontSize.xs }}
      >
        {cardView[cardType as keyof typeof cardView].metricLabel}
      </Typography>
      <Typography
        sx={{
          marginTop: "14px",
          paddingTop: "14px",
          borderTop: theme.borders.default,
          color: theme.colors.description,
          fontSize: theme.fontSize.xs,
        }}
      >
        {cardView[cardType as keyof typeof cardView].description(
          kpiValues as any,
        )}
      </Typography>
    </Card>
  );
}
