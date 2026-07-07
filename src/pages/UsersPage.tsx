import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeviceListFooter from "../components/DeviceList/DeviceListFooter";

type MockUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "User";
  isOnline: boolean;
};

const mockUsers: MockUser[] = [
  {
    id: "1",
    firstName: "Maksimas",
    lastName: "Volodascik",
    email: "maksimas@ltw.io",
    role: "Admin",
    isOnline: true,
  },
  {
    id: "2",
    firstName: "Elena",
    lastName: "Kazlauskaite",
    email: "elena.k@ltw.io",
    role: "Admin",
    isOnline: false,
  },
  {
    id: "3",
    firstName: "Tomas",
    lastName: "Petrauskas",
    email: "tomas.p@ltw.io",
    role: "User",
    isOnline: true,
  },
  {
    id: "4",
    firstName: "Unknown",
    lastName: "",
    email: "justina.r@ltw.io",
    role: "User",
    isOnline: false,
  },
  {
    id: "5",
    firstName: "Dovydas",
    lastName: "Sakalauskas",
    email: "dovydas.s@ltw.io",
    role: "User",
    isOnline: true,
  },
  {
    id: "6",
    firstName: "Greta",
    lastName: "Andriuskeviciute",
    email: "greta.a@ltw.io",
    role: "User",
    isOnline: false,
  },
];

export default function UsersPage() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleAction = (type: "edit" | "delete") => {
    console.log("pressed " + type);
    handleMenuClose();
  };

  return (
    <ContentLayout overflow="hidden">
      <Box
        sx={{
          background: theme.bg.card,
          border: theme.borders.subtle,
          borderWidth: "0px 1px 1px 1px",
          padding: "15px",
          marginBottom: "10px",
        }}
      >
        <Box sx={{ color: "white", fontWeight: "bold", marginBottom: "6px" }}>
          Users
        </Box>
        <Breadcrumbs
          separator={
            <NavigateNextIcon
              sx={{ fontSize: 14, color: theme.colors.description }}
            />
          }
        >
          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.description,
            }}
          >
            Access Control
          </Typography>
          <Typography
            sx={{ fontSize: theme.fontSize.xs, color: theme.colors.accent }}
          >
            Users
          </Typography>
        </Breadcrumbs>
      </Box>

      <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        {mockUsers.map((user) => (
          <ListItem disablePadding key={user.id}>
            <ListItemButton
              dense
              onClick={handleItemClick}
              sx={{
                bgcolor: theme.bg.listItem,
                padding: "14px 10px",
                margin: "0px 5px 5px 5px",
                borderRadius: "10px",
                border: theme.borders.listItemBorder,

                "&:hover": {
                  bgcolor: "#1f1f23",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
                transition: "all 120ms ease",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#3f3f46",
                    color: theme.colors.lightText,
                    fontSize: theme.fontSize.sm,
                  }}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: "bold",
                      fontSize: 14,
                      color: theme.colors.lightText,
                    },
                  },
                  secondary: {
                    sx: { fontSize: 12, color: theme.colors.description },
                  },
                }}
              />

              <Chip
                label={user.role}
                size="small"
                sx={{
                  marginRight: "10px",
                  border: "1px solid",
                  ...(user.role === "Admin"
                    ? {
                        color: "#c3b6dd",
                        bgcolor: "#651dff43",
                        borderColor: "#9684be3d",
                      }
                    : {
                        color: "#a1a1aa",
                        bgcolor: "#26262a",
                        borderColor: "#ffffff12",
                      }),

                  color: theme.colors.lightText,
                }}
              />

              <Chip
                label={user.isOnline ? "Online" : "Offline"}
                size="small"
                sx={{
                  border: "1px solid",
                  ...(user.isOnline
                    ? {
                        color: "#29df90",
                        bgcolor: "rgba(90,165,133,0.14)",
                        borderColor: "rgba(16, 218, 131, 0.31)",
                      }
                    : {
                        color: "#71717a",
                        bgcolor: "#26262a",
                        borderColor: "rgba(255,255,255,0.07)",
                      }),
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        slotProps={{ paper: { sx: { backgroundColor: theme.bg.tooltip } } }}
      >
        <MenuItem
          onClick={() => handleAction("edit")}
          sx={{ color: theme.colors.valueText }}
        >
          <EditIcon sx={{ marginRight: "8px", fontSize: 18 }} />
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleAction("delete")}
          sx={{ color: theme.buttons.danger }}
        >
          <DeleteIcon sx={{ marginRight: "8px", fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
      <DeviceListFooter />
    </ContentLayout>
  );
}
