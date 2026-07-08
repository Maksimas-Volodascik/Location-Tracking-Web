import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { theme } from "../../styles/theme";

export function PageLayout() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: theme.surface.page,
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  );
}
