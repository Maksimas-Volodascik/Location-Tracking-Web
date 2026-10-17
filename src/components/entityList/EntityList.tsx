import {
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { EntityListProps } from "../../types/entityList";
import { theme } from "../../styles/theme";

export function EntityList({
  rows,
  onRowClick,
  onRowContextMenu,
}: EntityListProps) {
  return rows?.map((item) => (
    <ListItem disablePadding key={item.id}>
      <ListItemButton
        dense
        onClick={(e) => onRowClick?.(item.id, e)}
        onContextMenu={
          onRowContextMenu
            ? (e) => {
                e.preventDefault(); //disable default browser right click menu
                onRowContextMenu(item.id, e);
              }
            : undefined
        }
        sx={{
          padding: "14px 10px",
          margin: "0px 5px 5px 5px",
          borderRadius: "10px",
          ...theme.listItem,
        }}
      >
        <ListItemAvatar>{item.icon}</ListItemAvatar>

        <ListItemText
          primary={item.main.primary}
          secondary={item.main.secondary}
          sx={{ flex: "0 0 250px" }}
          slotProps={{
            primary: {
              sx: {
                fontWeight: theme.fontWeight.bold,
                fontSize: theme.fontSize.xs,
                color: theme.colors.lightText,
              },
            },
            secondary: {
              sx: {
                fontWeight: theme.fontWeight.bold,
                fontSize: theme.fontSize.xs,
                color: theme.colors.faintDescription,
              },
            },
          }}
        />

        {item.details && (
          <ListItemText
            primary={item.details.primary}
            secondary={item.details.secondary}
            slotProps={{
              primary: {
                sx: {
                  fontWeight: theme.fontWeight.bold,
                  fontSize: theme.fontSize.xs,
                  color: theme.colors.lightText,
                },
              },
              secondary: {
                sx: {
                  fontWeight: theme.fontWeight.bold,
                  fontSize: theme.fontSize.xs,
                  color: theme.colors.faintDescription,
                },
              },
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
            marginLeft: "auto",
          }}
        >
          {item.tags?.map((tag) => (
            <Chip
              key={tag.label}
              label={tag.label}
              size="small"
              sx={{ border: "1px solid", ...tag.sx }}
            />
          ))}
        </Box>
      </ListItemButton>
    </ListItem>
  ));
}
