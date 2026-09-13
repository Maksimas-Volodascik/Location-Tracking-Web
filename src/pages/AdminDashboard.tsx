import { Box, Paper, Typography } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";

export function AdminDashboard() {
  return (
    <>
      <ContentLayout overflow="hidden">
        <Box sx={{ width: "100%", height: "100%", padding: "20px" }}>
          <Paper
            sx={{
              border: theme.borders.default,
              width: "100%",
              height: "45%",
              maxHeight: "45%",
              padding: "10px",
              overflow: "auto",
            }}
          >
            <Typography sx={{ color: theme.colors.lightText }}>
              Hello world
            </Typography>
          </Paper>
        </Box>
      </ContentLayout>
    </>
  );
}
