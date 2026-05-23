import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export function PageLayout() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "#111111",
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  );
}
