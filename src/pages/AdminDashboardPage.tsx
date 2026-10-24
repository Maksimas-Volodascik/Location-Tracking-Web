import { Box, Paper } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import type { AdminTableOption } from "../types/admin";
import type { DeviceModelData } from "../types/deviceModels";
import { AdminTableBar } from "../components/adminPanel/AdminTableBar";
import { EntityList } from "../components/entityList/EntityList";
import type { ListRow } from "../types/entityList";
import { deviceModelToRow, deviceToRow, userToRow } from "../utils/rowMapper";
import type { DeviceData } from "../types/device";
import type { UserData } from "../types/users";
import { ConsoleWindow } from "../components/adminPanel/ConsoleWindow";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDeviceModel,
  getAllDeviceModels,
} from "../services/deviceModelApi";
import { deleteDevice, getAllDevices } from "../services/deviceApi";
import { deleteUser, getAllUsers } from "../services/userApi";
import { OptionMenu, type MenuOptions } from "../components/ui/OptionMenu";

export function AdminDashboardPage() {
  const [selectedTable, setSelectedTable] = useState<AdminTableOption>("users");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const [selectedEntity, setSelectedEntity] = useState<
    UserData | DeviceData | DeviceModelData | undefined | null
  >(null);

  const [menuIsOpen, setMenuIsOpen] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const usersQuery = useQuery<UserData[] | null>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 2,
  });

  const devicesQuery = useQuery<DeviceData[] | null>({
    queryKey: ["devices"],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 2,
  });

  const deviceModelsQuery = useQuery<DeviceModelData[] | null>({
    queryKey: ["deviceModels"],
    queryFn: getAllDeviceModels,
    staleTime: 1000 * 60 * 2,
  });

  const queries = {
    users: usersQuery,
    devices: devicesQuery,
    deviceModels: deviceModelsQuery,
  };

  const queryClient = useQueryClient();

  const activeQuery = queries[selectedTable];

  const rows: Record<AdminTableOption, ListRow[]> = {
    users: usersQuery.data?.map(userToRow) ?? [],
    devices: devicesQuery.data?.map(deviceToRow) ?? [],
    deviceModels: deviceModelsQuery.data?.map(deviceModelToRow) ?? [],
  };

  const handleItemClick = (
    entityId: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (selectedTable === "users") {
      setSelectedEntity(usersQuery.data?.find((u) => u.userGuid == entityId));
    }
    if (selectedTable === "devices") {
      setSelectedEntity(devicesQuery.data?.find((u) => u.id == entityId));
    }
    if (selectedTable === "deviceModels") {
      setSelectedEntity(deviceModelsQuery.data?.find((u) => u.id == entityId));
    }
    setSelectedEntityId(entityId);
    setMenuIsOpen({ top: event.clientY, left: event.clientX });
  };

  const handleDelete: Record<AdminTableOption, (id: string) => Promise<void>> =
    {
      users: deleteUser,
      devices: deleteDevice,
      deviceModels: deleteDeviceModel,
    };

  const handleAction = async (type: MenuOptions) => {
    if (selectedEntity == null || selectedEntityId == null) return;

    if (type === "delete") {
      await handleDelete[selectedTable](selectedEntityId);
      queryClient.invalidateQueries({ queryKey: [`${selectedTable}`] });
    }

    setSelectedEntityId(null);
    setMenuIsOpen(null);
  };

  return (
    <>
      <ContentLayout overflow="hidden">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <ConsoleWindow />
          <Paper
            sx={{
              border: theme.borders.default,
              width: "100%",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <AdminTableBar
              selected={selectedTable}
              setSelectedTable={(v) => setSelectedTable(v)}
            />
            <Box sx={{ flex: 1, minHeight: 0, paddingTop: "5px" }}>
              <EntityList
                rows={rows[selectedTable]}
                isLoading={activeQuery.isLoading}
                isLoadingError={activeQuery.isLoadingError}
                onRowClick={(item, e) => handleItemClick(item, e)}
              />
              <OptionMenu
                menuIsOpen={menuIsOpen}
                handleMenuClose={() => setMenuIsOpen(null)}
                handleAction={handleAction}
                entity="users"
              />
            </Box>
          </Paper>
        </Box>
      </ContentLayout>
    </>
  );
}
