import { Box, Skeleton, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
import { Card } from "../ui/Card";
import type {
  DevicesKPI,
  ErrorsKPI,
  RecordsKPI,
  UsersKPI,
} from "../../types/dashboard";
import { capitalizeFirstLetter } from "../../utils";

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

type MetricCardProps = {
  cardType: string;
  kpiValues?: DevicesKPI | ErrorsKPI | UsersKPI | RecordsKPI;
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
        {capitalizeFirstLetter(cardType)}
      </Typography>

      <Typography
        sx={{
          fontSize: theme.fontSize["3xl"],
          fontWeight: theme.fontWeight.bold,
          letterSpacing: "0.5px",
          color: theme.colors.valueText,
        }}
      >
        {kpiValues ? (
          kpiValues.total
        ) : (
          <Skeleton variant="text" sx={{ width: "100%" }} />
        )}
      </Typography>

      <Typography
        sx={{ color: theme.colors.description, fontSize: theme.fontSize.xs }}
      >
        {cardType ? (
          cardView[cardType as keyof typeof cardView].metricLabel
        ) : (
          <Skeleton variant="text" sx={{ width: "100%" }} />
        )}
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
        {kpiValues ? (
          cardView[cardType as keyof typeof cardView].description(
            kpiValues as any,
          )
        ) : (
          <Skeleton variant="text" sx={{ width: "100%" }} />
        )}
      </Typography>
    </Card>
  );
}
