import List from "@mui/material/List";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Box, Typography } from "@mui/material";
import { getAllDevices } from "../services/deviceApi";
import { useQuery } from "@tanstack/react-query";
import type { DeviceData } from "../types/shared";
import { useState } from "react";
import { theme } from "../styles/theme";
import loadingIcon from "../assets/loading.svg";
import { DeviceListFooter } from "../components/deviceList/DeviceListFooter";
import { DeviceRecordsModal } from "../components/deviceList/DeviceRecordsModal";
import { DeviceListItem } from "../components/deviceList/DeviceListItem";
import { OptionMenu } from "../components/ui/OptionMenu";
import { Header } from "../components/ui/Header";

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

  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsOpen(true);
  };

  const [menuIsOpen, setMenuIsOpen] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); //disable default browser right click menu
    setMenuIsOpen({ top: event.clientY, left: event.clientX });
  };
  const handleMenuClose = () => setMenuIsOpen(null);

  return (
    <>
      <ContentLayout overflow="hidden">
        <Header page="Devices" tab="Telematics" />
        <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
          <DeviceRecordsModal
            isOpen={isOpen}
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
                onContextMenu={handleItemClick}
              />
            ))
          )}

          <OptionMenu
            menuIsOpen={menuIsOpen}
            handleMenuClose={handleMenuClose}
          />

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
    </>
  );
}
