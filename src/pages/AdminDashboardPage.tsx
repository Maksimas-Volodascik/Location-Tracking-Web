import { Box, Paper } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import type { AdminTableOption } from "../types/admin";
import type { DeviceModelData, DeviceModelForm } from "../types/deviceModels";
import { AdminTableBar } from "../components/adminPanel/AdminTableBar";
import { EntityList } from "../components/entityList/EntityList";
import type { ListRow } from "../types/entityList";
import { deviceModelToRow, deviceToRow, userToRow } from "../utils/rowMapper";
import type { DeviceData, DeviceForm } from "../types/device";
import type { UserData, UserForm } from "../types/users";
import { ConsoleWindow } from "../components/adminPanel/ConsoleWindow";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewDeviceModel,
  deleteDeviceModel,
  getAllDeviceModels,
  updateDeviceModel,
} from "../services/deviceModelApi";
import {
  createNewDevice,
  deleteDevice,
  getAllDevices,
  updateDevice,
} from "../services/deviceApi";
import { deleteUser, getAllUsers, updateUser } from "../services/userApi";
import { OptionMenu, type MenuOptions } from "../components/ui/OptionMenu";
import { UserModal } from "../components/userList/UserModal";
import { DeviceModal } from "../components/deviceList/DeviceModal";
import { DeviceModelModal } from "../components/deviceList/DeviceModelModal";
import { userRegister } from "../services/authApi";

export function AdminDashboardPage() {
  const [selectedTable, setSelectedTable] = useState<AdminTableOption>("users");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | undefined | null>(
    null,
  );
  const [selectedDevice, setSelectedDevice] = useState<
    DeviceData | undefined | null
  >(null);
  const [selectedDeviceModel, setSelectedDeviceModel] = useState<
    DeviceModelData | undefined | null
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
  const removeSelection = () => {
    setModalOpen(false);
    setSelectedDevice(null);
    setSelectedUser(null);
    setSelectedEntityId(null);
    setSelectedDeviceModel(null);
    setMenuIsOpen(null);
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
      setSelectedUser(usersQuery.data?.find((u) => u.userGuid == entityId));
    }
    if (selectedTable === "devices") {
      setSelectedDevice(devicesQuery.data?.find((u) => u.id == entityId));
    }
    if (selectedTable === "deviceModels") {
      setSelectedDeviceModel(
        deviceModelsQuery.data?.find((u) => u.id == entityId),
      );
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
    if (selectedEntityId == null) return;

    if (type === "delete") {
      await handleDelete[selectedTable](selectedEntityId);
      queryClient.invalidateQueries({ queryKey: [`${selectedTable}`] });
    }
    if (type === "edit") {
      setMenuIsOpen(null);
      setModalOpen(true);
      return;
    }
    removeSelection();
  };

  const handleUserSubmit = async (form: UserForm, userGuid: string | null) => {
    if (userGuid)
      await updateUser(
        {
          firstName: form.firstName,
          lastName: form.lastName,
          role: selectedUser?.role,
        },
        userGuid,
      );
    else await userRegister(form);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleDeviceSubmit = async (
    form: DeviceForm,
    deviceId: string | null,
  ) => {
    if (deviceId) await updateDevice(form, deviceId);
    else await createNewDevice(form);
    queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  const handleDeviceModelSubmit = async (
    form: DeviceModelForm,
    deviceModelId: string | null,
  ) => {
    if (deviceModelId) await updateDeviceModel(form, deviceModelId);
    else await createNewDeviceModel(form);
    queryClient.invalidateQueries({ queryKey: ["deviceModels"] });
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
              setSelectedTable={(v) => {
                removeSelection();
                setSelectedTable(v);
              }}
              onCreateClick={() => {
                removeSelection();
                setModalOpen(true);
              }}
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
        {selectedTable === "users" && (
          <UserModal
            open={modalOpen}
            setIsOpen={setModalOpen}
            onSubmit={handleUserSubmit}
            initialData={selectedUser}
          />
        )}
        {selectedTable === "devices" && (
          <DeviceModal
            open={modalOpen}
            setIsOpen={setModalOpen}
            onSubmit={handleDeviceSubmit}
            initialData={selectedDevice}
          />
        )}
        {selectedTable === "deviceModels" && (
          <DeviceModelModal
            open={modalOpen}
            setIsOpen={setModalOpen}
            onSubmit={handleDeviceModelSubmit}
            initialData={selectedDeviceModel}
          />
        )}
      </ContentLayout>
    </>
  );
}
