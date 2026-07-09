import List from "@mui/material/List";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Box, Typography } from "@mui/material";
import { getAllDevices, updateDevice } from "../services/deviceApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DeviceData, DeviceForm, MenuOptions } from "../types/shared";
import { useState } from "react";
import { theme } from "../styles/theme";
import loadingIcon from "../assets/loading.svg";
import { DeviceListFooter } from "../components/deviceList/DeviceListFooter";
import { DeviceRecordsModal } from "../components/deviceList/DeviceRecordsModal";
import { DeviceListItem } from "../components/deviceList/DeviceListItem";
import { Header } from "../components/ui/Header";
import { DeviceModal } from "../components/deviceList/DeviceModal";

export function DevicesPage() {
  const {
    data: devices,
    isLoading,
    isError,
  } = useQuery<DeviceData[] | null>({
    queryKey: ["devices"],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 2,
  });
  const queryClient = useQueryClient();

  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isRecordListOpen, setIsRecordListOpen] = useState(false);
  const handleClose = () => setIsRecordListOpen(false);
  const handleOpen = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsRecordListOpen(true);
  };

  const [editDevice, setEditDevice] = useState<DeviceData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAction = (type: MenuOptions, device: DeviceData) => {
    if (type === "edit") {
      setEditDevice(device);
      setIsEditModalOpen(true);
    } else if (type === "delete") {
      console.log(device);
    } else {
      handleOpen(device.id);
    }
  };

  const handleUpdate = async (form: DeviceForm, deviceId: string | null) => {
    await updateDevice(form, deviceId);
    queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  return (
    <>
      <ContentLayout overflow="hidden">
        <Header page="Devices" tab="Telematics" />
        <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
          <DeviceRecordsModal
            isOpen={isRecordListOpen}
            handleClose={handleClose}
            deviceId={selectedDevice}
          />
          {isLoading ? (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <img src={loadingIcon} alt="loading" width={50} height={50} />
            </Box>
          ) : (
            devices?.map((device) => (
              <DeviceListItem
                key={device.id}
                device={device}
                onClick={handleOpen}
                handleAction={handleAction}
              />
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
        <DeviceListFooter />
      </ContentLayout>
      <DeviceModal
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onSubmit={handleUpdate}
        initialData={editDevice}
      />
    </>
  );
}
