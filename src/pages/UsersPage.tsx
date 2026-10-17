import { Box, Divider, List, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "../services/userApi";
import loadingIcon from "../assets/loading.svg";
import type { UserData } from "../types/users";
import { Header } from "../components/ui/Header";
import { ItemListFooter } from "../components/ui/ItemListFooter";
import type { RegisterProps } from "../types/auth";
import { userRegister } from "../services/authApi";
import { EntityList } from "../components/entityList/EntityList";
import { userToRow } from "../utils/rowMapper";

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
  const [selectedUser, setSelectedUser] = useState<UserData | undefined | null>(
    null,
  );

  const queryClient = useQueryClient();

  const handleItemClick = (
    userId: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    const user = users?.find((u) => u.userGuid == userId);

    setSelectedUser(user);
    setMenuAnchor(event.currentTarget);
  };

  const filteredItems = users?.filter((user) =>
    user.email.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
  const handleMenuClose = () => setMenuAnchor(null);

  const handleAction = async (type: "edit" | "delete") => {
    if (!selectedUser) return;
    if (type === "edit") {
      console.log("edit was executed");
    }
    if (type === "delete") {
      await deleteUser(selectedUser.userGuid);
    }
    queryClient.invalidateQueries({ queryKey: ["users"] });
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
          <Entitylist
            rows={filteredItems?.map(userToRow)}
            onRowClick={(item, e) => handleItemClick(item, e)}
          />
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

      <ItemListFooter
        type="User"
        setFilter={setFilter}
        handleCreate={() => handleCreate}
      />
    </ContentLayout>
  );
}
