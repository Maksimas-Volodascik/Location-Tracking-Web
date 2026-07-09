import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ContentLayout } from "../components/layout/ContentLayout";
import {
  Box,
  Breadcrumbs,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import { getAllDevices } from "../services/deviceApi";
import { useQuery } from "@tanstack/react-query";
import type { DeviceData } from "../types/shared";
import { useState } from "react";
import { theme } from "../styles/theme";
import loadingIcon from "../assets/loading.svg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeviceListFooter } from "../components/deviceList/DeviceListFooter";
import { ModalView } from "../components/ModalView";

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

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleOpen = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const handleAction = (type: "edit" | "delete") => {
    console.log("pressed " + type);
    handleMenuClose();
  };

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setMenuAnchor(event.currentTarget);
  };

  return (
    <>
      <ContentLayout overflow="hidden">
        <Box
          sx={{
            background: theme.surface.card,
            border: theme.borders.subtle,
            borderWidth: "0px 1px 1px 1px",
            position: "relative",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
              marginBottom: "6px",
            }}
          >
            Devices
          </Box>
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                sx={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.description,
                }}
              />
            }
          >
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.description,
              }}
            >
              Telematics
            </Typography>
            <Typography
              sx={{ fontSize: theme.fontSize.xs, color: theme.colors.accent }}
            >
              Devices
            </Typography>
          </Breadcrumbs>
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
              <img src={loadingIcon} alt="loading" width={50} height={50} />
            </Box>
          ) : (
            devices?.map((device) => {
              return (
                <ListItem disablePadding key={device.id}>
                  <ListItemButton
                    dense
                    onClick={() => handleOpen(device.id)}
                    onContextMenu={handleItemClick}
                    sx={{
                      padding: "20px 10px",
                      margin: "0px 5px 5px 5px",
                      borderRadius: "10px",
                      ...theme.listItem,
                    }}
                  >
                    <DevicesIcon
                      sx={{
                        width: 28,
                        height: 28,
                        marginRight: 2,
                        flexShrink: 0,
                        color: theme.colors.valueText,
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        color: theme.colors.valueText,
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: theme.fontWeight.bold,
                          fontSize: theme.fontSize.xs,
                        }}
                      >
                        {device.name ? device.name : "{Unknown}"}
                      </Box>

                      <Box
                        sx={{
                          fontWeight: theme.fontWeight.bold,
                          fontSize: theme.fontSize.xs,
                          color: theme.colors.faintDescription,
                        }}
                      >
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
                          fontWeight: theme.fontWeight.bold,
                          fontSize: theme.fontSize.xs,
                          color: theme.colors.valueText,
                        }}
                      >
                        {device.deviceModel ? device.deviceModel : "NovaX130"}
                      </Box>

                      <Box
                        sx={{
                          fontWeight: theme.fontWeight.bold,
                          fontSize: theme.fontSize.xs,
                          color: theme.colors.faintDescription,
                        }}
                      >
                        Serial #{device.id}
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })
          )}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            slotProps={{
              paper: { sx: { backgroundColor: theme.surface.tooltip } },
            }}
          >
            <MenuItem
              dense
              onClick={() => handleAction("edit")}
              sx={{ color: theme.colors.valueText }}
            >
              <EditIcon
                sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
              />
              Edit
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => handleAction("delete")}
              sx={{ color: theme.buttons.danger }}
            >
              <DeleteIcon
                sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
              />
              Delete
            </MenuItem>
          </Menu>

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
