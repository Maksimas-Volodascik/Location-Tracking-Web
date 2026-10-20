import { Box, Paper, Typography } from "@mui/material";
import { ContentLayout } from "../components/layout/ContentLayout";
import { theme } from "../styles/theme";
import type {
  AdminTableOption,
  DeviceModelData,
  LogEntry,
} from "../types/admin";
import { useQuery } from "@tanstack/react-query";
import { getAllLogEntries } from "../services/adminPanelApi";
import { AdminTableBar } from "../components/adminPanel/AdminTableBar";
import { EntityList } from "../components/entityList/EntityList";
import type { ListRow } from "../types/entityList";
import { deviceModelToRow, deviceToRow, userToRow } from "../utils/rowMapper";
import type { DeviceData } from "../types/device";
import type { UserData } from "../types/users";
import { ConsoleWindow } from "../components/adminPanel/ConsoleWindow";

const mockUsers: UserData[] = [
  {
    userGuid: "u-1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    role: "Admin",
  },
  {
    userGuid: "u-2",
    firstName: "Anna",
    lastName: "Kowalska",
    email: "anna.k@example.com",
    role: "User",
  },
  {
    userGuid: "u-3",
    firstName: "Tom",
    lastName: "Baker",
    email: "tom.baker@example.com",
    role: "User",
  },
];

const mockDevices: DeviceData[] = [
  {
    id: "d-1",
    imei: "356307042441013",
    name: "Truck #12",
    isEnabled: true,
    lastSeen: "2026-10-19T08:12:00Z",
    dateAdded: "2026-09-01T10:00:00Z",
    deviceModelId: "FMC650",
  },
  {
    id: "d-2",
    imei: "352093081234567",
    name: "Van #3",
    isEnabled: false,
    lastSeen: "2026-10-17T15:40:00Z",
    dateAdded: "2026-09-14T09:30:00Z",
    deviceModelId: "FMB920",
  },
];

const mockDeviceModels: DeviceModelData[] = [
  {
    id: "1db077dd-e60c-4fed-a31e-d605bd630492",
    name: "FMC650(Teltonika)",
    protocolName: "FMC650",
    description: "Codec 8E",
  },
  {
    id: "1db077dd-e60c-4fed-a31e-d605bd630492",
    name: "FMB920(Teltonika)",
    protocolName: "FMB920",
    description: "Codec 8",
  },
  {
    id: "1db077dd-e60c-4fed-a31e-d605bd630492",
    name: "G502(Test)",
    protocolName: "G502",
    description: "GT06",
  },
];

const mockRows: Record<AdminTableOption, ListRow[]> = {
  users: mockUsers.map(userToRow),
  devices: mockDevices.map(deviceToRow),
  deviceModels: mockDeviceModels.map(deviceModelToRow),
};

export function AdminDashboardPage() {
  const selectedTable: AdminTableOption = "deviceModels";

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
            <AdminTableBar selected={selectedTable} />
            <Box sx={{ flex: 1, minHeight: 0, paddingTop: "5px" }}>
              <EntityList rows={mockRows[selectedTable]} />
            </Box>
          </Paper>
        </Box>
      </ContentLayout>
    </>
  );
}
