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
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userApi";
import loadingIcon from "../assets/loading.svg";
import type { UserData } from "../types/users";
import { Header } from "../components/ui/Header";

export function UsersPage() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserData[] | null>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 2,
  });
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
      <Header page="Users" tab="Access Control" />

      <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        {isLoading ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img src={loadingIcon} alt="loading" width={50} height={50} />
          </Box>
        ) : (
          users?.map((user) => (
            <ListItem disablePadding key={user.guid}>
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
                    {user.firstName
                      ? user.firstName[0] + user.lastName[0]
                      : "/"}
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
                        fontWeight: theme.fontWeight.bold,
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.faintDescription,
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
                  //label={user.isOnline ? "Online" : "Offline"}
                  label="Online"
                  size="small"
                  sx={{
                    border: "1px solid",
                    ...theme.userStatusTheme.online,
                    /*...(user.isOnline
                        ? theme.userStatusTheme.online
                        : theme.userStatusTheme.offline),*/
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
        {isError ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                color: theme.colors.faintDescription,
                fontSize: theme.fontSize.xl,
              }}
            >
              List is empty :(
            </Typography>
          </Box>
        ) : null}
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
