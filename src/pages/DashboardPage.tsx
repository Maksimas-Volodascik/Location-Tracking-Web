import {
  Box,
  Card,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageLayout } from "../components/layout/PageLayout";
import Sidebar from "../components/Sidebar";
import { ContentLayout } from "../components/layout/ContentLayout";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  type PieSectorShapeProps,
} from "recharts";

const data = [
  { name: "Active", value: 72 },
  { name: "Inactive", value: 32 },
  { name: "Never connected", value: 12 },
];

const colors = ["#e24646", "#ec7424", "#413c35"];

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={colors[props.index % colors.length]} />
);

export default function DashboardPage() {
  return (
    <>
      <PageLayout>
        <Sidebar />
        <ContentLayout>
          <Box
            sx={{
              padding: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
            }}
          >
            <Card
              sx={{
                background: "#1a1917",
                borderRadius: "1px solid #0a0a09",
                position: "relative",
                padding: "20px",
              }}
            >
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
            <Card
              sx={{
                background: "#1a1917",
                borderRadius: "1px solid #0a0a09",
                position: "relative",
                padding: "20px",
              }}
            >
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
            <Card
              sx={{
                background: "#1a1917",
                borderRadius: "1px solid #0a0a09",
                position: "relative",
                padding: "20px",
              }}
            >
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
            <Card
              sx={{
                background: "#1a1917",
                borderRadius: "1px solid #0a0a09",
                position: "relative",
                padding: "20px",
              }}
            >
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
          </Box>

          <Box
            sx={{
              padding: "0px 30px 30px 30px",
              display: "grid",
              gridTemplateColumns: "3fr 3fr 2fr",
              gap: "14px",
            }}
          >
            <Card
              sx={{
                background: "#1a1917",
                borderRadius: "1px solid #0a0a09",
                position: "relative",
                padding: "20px",
              }}
            >
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
              <Box
                sx={{ display: "flex", alignItemstems: "center", gap: "32px" }}
              >
                <Box
                  sx={{
                    marginTop: "20px",
                    width: 180,
                    height: 180,
                    display: "flex",
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
                        cornerRadius={8}
                        stroke="none"
                        shape={MyCustomPie}
                      ></Pie>
                      <text
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x="50%"
                          dy="-0.2em"
                          fontSize="42"
                          fontWeight="bold"
                          fill="#e2e2e2"
                        >
                          {100}
                        </tspan>
                        <tspan
                          x="50%"
                          dy="2em"
                          fontSize="14"
                          fontWeight="500"
                          fill="#8a8580"
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
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        backgroundColor: "#e24646",
                      }}
                    ></Box>
                    <Box sx={{ fontSize: "13px", color: "#e2e2e2" }}>
                      Active today
                    </Box>
                    <Box
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "#e2e2e2",
                      }}
                    >
                      72
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        backgroundColor: "#ec7424",
                      }}
                    ></Box>
                    <Box sx={{ fontSize: "13px", color: "#e2e2e2" }}>
                      Offline ({">"}24 hours)
                    </Box>
                    <Box
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "#e2e2e2",
                      }}
                    >
                      72
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        backgroundColor: "#413c35",
                      }}
                    ></Box>
                    <Box sx={{ fontSize: "13px", color: "#e2e2e2" }}>
                      Never connected
                    </Box>
                    <Box
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "#e2e2e2",
                      }}
                    >
                      72
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
            <TableContainer
              component={Paper}
              sx={{ width: "100%", background: "#1a1917" }}
            >
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    Table for devices and total messages sent today
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Box sx={{ width: "100%", background: "#1a1917" }}></Box>
          </Box>
        </ContentLayout>
      </PageLayout>
    </>
  );
}
