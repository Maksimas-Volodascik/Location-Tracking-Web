import { Box, Paper, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
import { getAllLogEntries } from "../../services/adminPanelApi";
import { useQuery } from "@tanstack/react-query";
import type { LogEntry } from "../../types/admin";

export function ConsoleWindow() {
  const { data: logMessages, isLoading } = useQuery<LogEntry[] | null>({
    queryKey: ["logs"],
    queryFn: getAllLogEntries,
    staleTime: 1000 * 60 * 1,
  });
  return (
    <Box sx={{ height: "45%", display: "flex", flexDirection: "column" }}>
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
          flex: 1,
          minHeight: 0,
          padding: "10px",
          overflow: "auto",
        }}
      >
        {isLoading
          ? "loading..."
          : logMessages?.map((logEntry) => (
              <Typography
                key={logEntry.traceId}
                sx={{ color: theme.colors.lightText }}
              >
                {`[${logEntry.receivedDate}] ${logEntry.message}`}
              </Typography>
            ))}
      </Paper>
    </Box>
  );
}
