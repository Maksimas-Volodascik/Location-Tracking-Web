import {
  Avatar,
  Box,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers, updateUser } from "../services/userApi";
import loadingIcon from "../assets/loading.svg";
import type { UserData } from "../types/users";
import { Header } from "../components/ui/Header";
import { ItemListFooter } from "../components/ui/ItemListFooter";
import type { RegisterProps } from "../types/auth";
import { userRegister } from "../services/authApi";

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
  const [filter, setFilter] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const queryClient = useQueryClient();
  const handleItemClick = (
    userData: UserData,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setSelectedUser(userData);
    setMenuAnchor(event.currentTarget);
  };

  const filteredItems = users?.filter((user) =>
    user.email.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
  const handleMenuClose = () => setMenuAnchor(null);

  const handleDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.userGuid);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleAction = (type: "edit" | "delete") => {
    console.log("pressed " + type + " and data: " + selectedUser?.userGuid);
    handleMenuClose();
  };

  const handleCreate = async (form: RegisterProps) => {
    await userRegister(form);
    queryClient.invalidateQueries({ queryKey: ["users"] });
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
          filteredItems?.map((user) => (
            <ListItem disablePadding key={user.userGuid}>
              <ListItemButton
                dense
                onClick={(e) => handleItemClick(user, e)}
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
        <MenuItem onClick={handleDelete} sx={{ color: theme.buttons.danger }}>
          <DeleteIcon
            sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
          />
          Delete
        </MenuItem>
      </Menu>

      <ItemListFooter
        type="User"
        setFilter={setFilter}
        handleCreate={() => handleCreate}
      />
    </ContentLayout>
  );
}
