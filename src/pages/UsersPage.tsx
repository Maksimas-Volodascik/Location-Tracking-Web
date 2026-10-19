import React, { useState } from "react";
import { ContentLayout } from "../components/layout/ContentLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "../services/userApi";
import type { UserData } from "../types/users";
import { Header } from "../components/ui/Header";
import { ItemListFooter } from "../components/ui/ItemListFooter";
import type { RegisterProps } from "../types/auth";
import { userRegister } from "../services/authApi";
import { EntityList } from "../components/entityList/EntityList";
import { userToRow } from "../utils/rowMapper";
import { OptionMenu, type MenuOptions } from "../components/ui/OptionMenu";

export function UsersPage() {
  const {
    data: users,
    isLoading,
    isLoadingError,
  } = useQuery<UserData[] | null>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 2,
  });
  const [menuIsOpen, setMenuIsOpen] = useState<{
    top: number;
    left: number;
  } | null>(null);
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
    setMenuIsOpen({ top: event.clientY, left: event.clientX });
  };

  const filteredItems = users?.filter((user) =>
    user.email.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
  const handleMenuClose = () => setMenuIsOpen(null);

  const handleAction = async (type: MenuOptions) => {
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
      <EntityList
        rows={filteredItems?.map(userToRow)}
        onRowClick={(item, e) => handleItemClick(item, e)}
        isLoadingError={isLoadingError}
        isLoading={isLoading}
      />
      <OptionMenu
        menuIsOpen={menuIsOpen}
        handleMenuClose={handleMenuClose}
        handleAction={handleAction}
        entity="users"
      />
      <ItemListFooter
        type="User"
        setFilter={setFilter}
        handleCreate={() => handleCreate}
      />
    </ContentLayout>
  );
}
