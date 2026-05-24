import { Box, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../services/tokenService";

export function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "5px 12px",
        borderTop: "1px solid #0a0a09",
        color: "white",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15%",
          marginLeft: "10px",
          textAlign: "center",
          "&:hover": {
            background: "#2b2b2b",
            borderRadius: "10px",
          },
        }}
      >
        <Box
          component="img"
          src="src\assets\navIcon.png"
          sx={{
            width: "32px",
            height: "32px",

            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        />
        <Box>
          <Box>Name/Email</Box>
          <Box>Role goes here</Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#2b2929",
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: "white", fontWeight: "bold" }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
