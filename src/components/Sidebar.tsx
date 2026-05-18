import { Box, Typography } from "@mui/material";
import Button from "./Button";
import { clearAccessToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          width: "300px",
          background: "#1a1917",
          borderRight: "1px solid #2e2c29",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="src\assets\navIcon.png"
              sx={{
                width: "40px",
                height: "40px",
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
            >
              LTW
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#8a8580", fontWeight: "bold" }}
            >
              Location Tracking Web
            </Typography>
          </Box>
        </Box>
        <Button onClick={() => handleLogout()}>Log out</Button>
      </Box>
    </>
  );
}
