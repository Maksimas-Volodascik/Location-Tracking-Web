import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ContentLayout } from "../components/layout/ContentLayout";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import { getAllDevices } from "../services/deviceApi";
import { useQuery } from "@tanstack/react-query";
import type { DeviceData } from "../types/shared";
import { useState } from "react";
import ModalView from "../components/ModalView";
import { theme } from "../styles/theme";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

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

        <Box
          sx={{
            background: theme.bg.card,
            display: "flex",
            position: "relative",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#cecece",
              border: `1px solid ${focused ? "#5b8dee" : "#2e2e2e"}`,
              borderRadius: "12px",
              px: 1,
              margin: "10px",
              gap: 1,
              width: "90%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <SearchIcon
              sx={{ fontSize: 15, color: focused ? "#5b8dee" : "#888888" }}
            />
            <InputBase
              fullWidth
              placeholder="Search IMEI…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              sx={{
                height: "40px",
                color: "#ffffff",
                fontSize: "0.8rem",
                "& input": {
                  padding: "4px 0",
                  "&::placeholder": { color: "#888888", opacity: 1 },
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", width: "10%" }}>
            <IconButton
              sx={{
                position: "absolute",
                transform: "translateY(-35%)",
              }}
              aria-label="delete"
              onClick={() => console.log("Add Device Button")}
            >
              <AddCircleIcon
                sx={{
                  color: theme.buttons.success,
                  width: "60px",
                  height: "60px",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </ContentLayout>
    </>
  );
}
