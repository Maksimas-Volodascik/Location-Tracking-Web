import { Box, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../services/tokenService";
import { theme } from "../../styles/theme";

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
        borderTop: theme.borders.strong,
        color: theme.colors.valueText,
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
            background: theme.buttons.secondaryHover,
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
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
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
              backgroundColor: theme.bg.tooltip,
            },
          },
        }}
      >
        <MenuItem
          sx={{
            color: theme.colors.valueText,
            fontWeight: theme.fontWeight.bold,
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
