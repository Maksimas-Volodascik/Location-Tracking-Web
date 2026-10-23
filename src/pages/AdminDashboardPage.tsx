import { Box, Paper } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import type { AdminTableOption, DeviceModelData } from "../types/admin";
import { AdminTableBar } from "../components/adminPanel/AdminTableBar";
import { EntityList } from "../components/entityList/EntityList";
import type { ListRow } from "../types/entityList";
import { deviceModelToRow, deviceToRow, userToRow } from "../utils/rowMapper";
import type { DeviceData } from "../types/device";
import type { UserData } from "../types/users";
import { ConsoleWindow } from "../components/adminPanel/ConsoleWindow";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDeviceModels } from "../services/deviceModelApi";
import { getAllDevices } from "../services/deviceApi";
import { getAllUsers } from "../services/userApi";

export function AdminDashboardPage() {
  const [selectedTable, setSelectedTable] = useState<AdminTableOption>("users");

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

  const activeQuery = queries[selectedTable];

  const rows: Record<AdminTableOption, ListRow[]> = {
    users: usersQuery.data?.map(userToRow) ?? [],
    devices: devicesQuery.data?.map(deviceToRow) ?? [],
    deviceModels: deviceModelsQuery.data?.map(deviceModelToRow) ?? [],
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
              />
            </Box>
          </Paper>
        </Box>
      </ContentLayout>
    </>
  );
}
