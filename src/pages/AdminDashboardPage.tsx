import { Box, Paper, Typography } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import type { LogEntry } from "../types/admin";
import { useQuery } from "@tanstack/react-query";
import { getAllLogEntries } from "../services/adminPanelApi";

export function AdminDashboardPage() {
  const { data: logMessages, isLoading } = useQuery<LogEntry[] | null>({
    queryKey: ["logs"],
    queryFn: getAllLogEntries,
    staleTime: 1000 * 60 * 1,
  });

  return (
    <>
      <ContentLayout overflow="hidden">
        <Box sx={{ width: "100%", height: "100%", padding: "20px" }}>
          <Paper
            sx={{
              border: theme.borders.default,
              width: "100%",
              padding: "5px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            TCP Listener Server
          </Paper>

          <Paper
            sx={{
              border: theme.borders.default,
              width: "100%",
              height: "45%",
              maxHeight: "45%",
              minHeight: "45%",
              padding: "10px",
              overflow: "auto",
            }}
          >
            {isLoading
              ? "loading..."
              : logMessages?.map((logEntry) => (
                  <Typography sx={{ color: theme.colors.lightText }}>
                    {`[${logEntry.receivedDate}] ${logEntry.message}`}
                  </Typography>
                ))}
          </Paper>
        </Box>
      </ContentLayout>
    </>
  );
}
