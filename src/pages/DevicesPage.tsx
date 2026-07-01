import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Box, Typography } from "@mui/material";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import { getAllDevices } from "../services/deviceApi";
import { useQuery } from "@tanstack/react-query";
import type { DeviceData } from "../types/shared";
import { useState } from "react";
import ModalView from "../components/ModalView";
import { theme } from "../styles/theme";
import DeviceListFooter from "../components/DeviceList/DeviceListFooter";

export default function DevicesPage() {
  const {
    data: devices,
    isLoading,
    isError,
  } = useQuery<DeviceData[] | null>({
    queryKey: ["devices"],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 2,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleOpen = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ContentLayout overflow="hidden">
        <Box
          sx={{
            background: theme.bg.card,
            border: theme.borders.subtle,
            borderWidth: "0px 1px 1px 1px",
            position: "relative",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ color: "white", fontWeight: "bold" }}>Devices</Box>
        </Box>
        <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
          <ModalView
            isOpen={isOpen}
            handleClose={handleClose}
            deviceId={selectedDevice}
          />
          {isLoading ? (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <img
                src="src\assets\loading.svg"
                alt="loading"
                width={50}
                height={50}
              />
            </Box>
          ) : (
            devices?.map((device) => {
              return (
                <ListItem disablePadding key={device.id}>
                  <ListItemButton
                    dense
                    onClick={() => handleOpen(device.id)}
                    sx={{
                      bgcolor: theme.bg.listItem,
                      padding: "20px 10px",
                      margin: "0px 5px 5px 5px",
                      borderRadius: "10px",
                      "&:hover": {
                        bgcolor: "#999999",
                      },

                      "&:active": {
                        transform: "scale(0.98)",
                      },

                      transition: "all 120ms ease",
                    }}
                  >
                    <DevicesIcon
                      sx={{
                        width: 28,
                        height: 28,
                        marginRight: 2,
                        flexShrink: 0,
                        color: theme.colors.contrastText,
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        color: theme.colors.contrastText,
                      }}
                    >
                      <Box sx={{ fontWeight: "bold", fontSize: 14 }}>
                        {device.name}
                      </Box>

                      <Box sx={{ fontSize: 12, color: "#555" }}>
                        IMEI #{device.imei}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 15,
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: "bold",
                          fontSize: 13,
                          color: theme.colors.contrastText,
                        }}
                      >
                        Title {device.deviceModel}
                      </Box>

                      <Box sx={{ fontSize: 12, color: "#555" }}>
                        Serial #{device.id}
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })
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
    </>
  );
}
