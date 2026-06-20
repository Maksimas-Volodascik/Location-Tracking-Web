import { Box } from "@mui/material";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  type PieSectorShapeProps,
} from "recharts";
import { theme } from "../../styles/theme";

const data = [
  { name: "Active", value: 72 },
  { name: "Inactive", value: 32 },
  { name: "Never connected", value: 12 },
];

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector
    {...props}
    fill={
      theme.chart.seriesColors[props.index % theme.chart.seriesColors.length]
    }
  />
);

export function DeviceActivityPieChart() {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Box
        sx={{
          marginTop: "20px",
          minWidth: "10vw",
          height: 180,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={5}
              cornerRadius={4}
              stroke="none"
              shape={MyCustomPie}
            ></Pie>
            <text y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan
                x="50%"
                dy="-0.2em"
                fontSize={theme.fontSize["4xl"]}
                fontWeight={theme.fontWeight.bold}
                fill={theme.colors.valueText}
              >
                {100}
              </tspan>
              <tspan
                x="50%"
                dy="2em"
                fontSize={theme.fontSize.sm}
                fontWeight={theme.fontWeight.semibold}
                fill={theme.colors.description}
              >
                Total
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "30px",
          gap: "15px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            sx={{
              width: "10px",
              height: "15px",
              borderRadius: "3px",
              backgroundColor: theme.chart.series.online,
            }}
          ></Box>
          <Box
            sx={{ fontSize: theme.fontSize.sm, color: theme.colors.valueText }}
          >
            Active today
          </Box>
          <Box
            sx={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            72
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            sx={{
              width: "10px",
              height: "15px",
              borderRadius: "3px",
              backgroundColor: theme.chart.series.offline,
            }}
          ></Box>
          <Box
            sx={{ fontSize: theme.fontSize.sm, color: theme.colors.valueText }}
          >
            Offline ({">"}24 hours)
          </Box>
          <Box
            sx={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            72
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            sx={{
              width: "10px",
              height: "15px",
              borderRadius: "3px",
              backgroundColor: theme.chart.series.never,
            }}
          ></Box>
          <Box
            sx={{ fontSize: theme.fontSize.sm, color: theme.colors.valueText }}
          >
            Never connected
          </Box>
          <Box
            sx={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            72
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
