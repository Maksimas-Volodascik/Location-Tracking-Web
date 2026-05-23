import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UserIcon from "@mui/icons-material/Person";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import TelematicsIcon from "@mui/icons-material/Monitor";
import SpeedIcon from "@mui/icons-material/Speed";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccessIcon from "@mui/icons-material/Groups";
import DocumentationIcon from "@mui/icons-material/QuestionMark";
import ApiIcon from "@mui/icons-material/Api";

import { ProfileMenu } from "./sidebarComponents/profileMenu";

export default function Sidebar() {
  const [openAccControl, setOpenAccControl] = useState(true);
  const [openTelematics, setOpenTelematics] = useState(true);
  const [openDocs, setOpenDocs] = useState(true);

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

        <Box sx={{ flex: 1 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, color: "white" }}
            component="nav"
            dense={true}
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenTelematics(!openTelematics)}>
              <ListItemIcon>
                <TelematicsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Telematics" />
              {openTelematics ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openTelematics} timeout="auto" unmountOnExit>
              <List component="div" disablePadding dense={true}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DevicesIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Devices" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setOpenAccControl(!openAccControl);
              }}
            >
              <ListItemIcon>
                <AccessIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Access Control" />
              {openAccControl ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openAccControl} timeout="auto" unmountOnExit>
              <List component="div" disablePadding dense={true}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <UserIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SpeedIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Limits" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setOpenDocs(!openDocs);
              }}
            >
              <ListItemIcon>
                <DocumentationIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Documentation" />
              {openDocs ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openDocs} timeout="auto" unmountOnExit>
              <List component="div" disablePadding dense={true}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ApiIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="API" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        <ProfileMenu />
      </Box>
    </>
  );
}
