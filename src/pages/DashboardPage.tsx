import { Box, Card, Typography } from "@mui/material";
import { PageLayout } from "../components/layout/PageLayout";
import Sidebar from "../components/Sidebar";
import { ContentLayout } from "../components/layout/ContentLayout";
import Button from "../components/Button";

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
                padding: "16px",
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
                padding: "16px",
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
                padding: "16px",
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
                padding: "16px",
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
        </ContentLayout>
      </PageLayout>
    </>
  );
}
