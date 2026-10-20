import { Avatar } from "@mui/material";
import { theme } from "../styles/theme";
import type { DeviceData } from "../types/device";
import type { ListRow } from "../types/entityList";
import DevicesIcon from "@mui/icons-material/DeveloperBoard";
import type { UserData } from "../types/users";
import ModelIcon from "@mui/icons-material/Memory";
import type { DeviceModelData } from "../types/admin";

export const deviceToRow = (d: DeviceData): ListRow => ({
  id: d.id,
  icon: (
    <DevicesIcon
      sx={{
        width: 28,
        height: 28,
        marginRight: 2,
        flexShrink: 0,
        color: theme.colors.valueText,
      }}
    />
  ),
  main: { primary: d.name || "{Unknown}", secondary: `IMEI #${d.imei}` },
  details: { primary: d.deviceModelId, secondary: d.id },
});

export const userToRow = (u: UserData): ListRow => ({
  id: u.userGuid,
  icon: (
    <Avatar>
      {u.firstName ? u.firstName?.[0] : "/"}
      {u.lastName ? u.lastName?.[0] : "/"}
    </Avatar>
  ),
  main: { primary: `${u.firstName} ${u.lastName}`, secondary: u.email },
  tags: [{ label: u.role, sx: theme.roleTheme[u.role.toLowerCase()] }],
});

export const deviceModelToRow = (m: DeviceModelData): ListRow => ({
  id: m.id,
  icon: (
    <ModelIcon
      sx={{
        width: 28,
        height: 28,
        marginRight: 2,
        flexShrink: 0,
        color: theme.colors.valueText,
      }}
    />
  ),
  main: { primary: m.name, secondary: m.manufacturer },
  details: { primary: m.protocol, secondary: m.id },
});
