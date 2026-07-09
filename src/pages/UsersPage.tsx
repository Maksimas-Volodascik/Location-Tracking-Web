import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Divider,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeviceListFooter } from "../components/deviceList/DeviceListFooter";

type MockUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
    role: "Admin",
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

export function UsersPage() {
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
          background: theme.surface.card,
          border: theme.borders.subtle,
          borderWidth: "0px 1px 1px 1px",
          padding: "15px",
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            color: theme.colors.valueText,
            fontWeight: theme.fontWeight.bold,
            marginBottom: "6px",
          }}
        >
          Users
        </Box>
        <Breadcrumbs
          separator={
            <NavigateNextIcon
              sx={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.description,
              }}
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
                padding: "14px 10px",
                margin: "0px 5px 5px 5px",
                borderRadius: "10px",
                ...theme.listItem,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: theme.surface.avatar,
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
                      fontWeight: theme.fontWeight.bold,
                      fontSize: theme.fontSize.xs,
                      color: theme.colors.lightText,
                    },
                  },
                  secondary: {
                    sx: {
                      fontSize: theme.fontSize.xs,
                      color: theme.colors.description,
                    },
                  },
                }}
              />

              <Chip
                label={user.role}
                size="small"
                sx={{
                  marginRight: "10px",
                  border: "1px solid",
                  ...(theme.roleTheme[user.role?.toLowerCase()] ??
                    theme.roleTheme.user),
                }}
              />

              <Chip
                label={user.isOnline ? "Online" : "Offline"}
                size="small"
                sx={{
                  border: "1px solid",
                  ...(user.isOnline
                    ? theme.userStatusTheme.online
                    : theme.userStatusTheme.offline),
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
        slotProps={{
          paper: { sx: { backgroundColor: theme.surface.tooltip } },
        }}
      >
        <MenuItem
          onClick={() => handleAction("edit")}
          sx={{ color: theme.colors.valueText }}
        >
          <EditIcon sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }} />
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleAction("delete")}
          sx={{ color: theme.buttons.danger }}
        >
          <DeleteIcon
            sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
          />
          Delete
        </MenuItem>
      </Menu>
      <DeviceListFooter />
    </ContentLayout>
  );
}
