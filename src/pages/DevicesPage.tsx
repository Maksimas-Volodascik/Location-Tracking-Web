import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ContentLayout } from "../components/layout/ContentLayout";
import { Box } from "@mui/material";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import { getAllDevices } from "../services/deviceApi";
import { useQuery } from "@tanstack/react-query";
import type { DeviceData } from "../types/shared";
import { useState } from "react";
import ModalView from "../components/ModalView";

export default function DevicesPage() {
  const {
    data: devices,
    isLoading,
    error,
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
      <ContentLayout>
        <Box
          sx={{
            background: "#1a1917",
            borderWidth: "0px 1px 1px 1px",
            borderColor: "#3f3f3f",
            borderStyle: "solid",
            borderRadius: 1,
            position: "relative",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ color: "white", fontWeight: "bold" }}>Devices</Box>
        </Box>
        <List sx={{ width: "100%" }}>
          <ModalView
            isOpen={isOpen}
            handleClose={handleClose}
            deviceId={selectedDevice}
          />
          {devices?.map((device) => {
            return (
              <ListItem disablePadding key={device.id}>
                <ListItemButton
                  dense
                  onClick={() => handleOpen(device.id)}
                  sx={{
                    bgcolor: "#e0e0e0",
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
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
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
                    <Box sx={{ fontWeight: "bold", fontSize: 13 }}>
                      Title {device.deviceModel}
                    </Box>

                    <Box sx={{ fontSize: 12, color: "#555" }}>
                      Serial #{device.lastSeen}
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </ContentLayout>
    </>
  );
}
