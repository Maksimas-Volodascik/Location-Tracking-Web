import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Box } from "@mui/material";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import { theme } from "../../styles/theme";
import type { DeviceData } from "../../types/shared";

interface DeviceListItemProps {
  device: DeviceData;
  onClick: (deviceId: string) => void;
  onContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export function DeviceListItem({
  device,
  onClick,
  onContextMenu,
}: DeviceListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        dense
        onClick={() => onClick(device.id)}
        onContextMenu={onContextMenu}
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
}
