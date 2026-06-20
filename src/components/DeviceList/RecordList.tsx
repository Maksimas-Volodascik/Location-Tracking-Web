import { Box, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import RecordDrawer from "./RecordDrawer";
import { useQuery } from "@tanstack/react-query";
import type { RecordData } from "../../types/shared";
import { getDeviceRecords } from "../../services/deviceApi";
import { theme } from "../../styles/theme";

type RecordListProps = {
  deviceId: string | null;
};

export default function RecordList({ deviceId }: RecordListProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecordData | null>(null);
  const {
    data: records,
    isLoading,
    error,
  } = useQuery<RecordData[] | null>({
    queryKey: ["records", deviceId],
    queryFn: () => getDeviceRecords(deviceId),
    staleTime: 1000 * 60 * 2,
  });

  function handleDrawerOpen(item: RecordData) {
    //todo: change any to type
    setSelectedItem(item);
    setOpenDrawer(true);
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <List disablePadding>
        {records?.map((item, idx) => {
          return (
            <ListItem
              key={idx}
              onClick={() => handleDrawerOpen(item)}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto 1fr",
                px: 3,
                gap: 3,
                height: 38,
                alignItems: "stretch",
                borderLeft: "2px solid transparent",
                borderBottom: theme.borders.subtle,
                backgroundColor: theme.bg.card,

                "&:hover": {
                  backgroundColor: theme.bg.cardHover,
                },
              }}
            >
              <Typography
                sx={{
                  height: "100%",
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.valueText,
                  fontWeight: theme.fontWeight.bold,
                }}
              >
                {item.receivedAt}
              </Typography>

              <Typography
                sx={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.valueText,
                  fontWeight: theme.fontWeight.bold,
                }}
              >
                {item.expiresAt}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.valueText,
                  fontWeight: theme.fontWeight.bold,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                {item.parsedData}
              </Typography>
            </ListItem>
          );
        })}

        <Box sx={{ height: 3 }} />
      </List>
      <RecordDrawer
        selectedItem={selectedItem}
        openDrawer={openDrawer}
        handleClose={() => {
          {
            setOpenDrawer(false);
            setSelectedItem(null);
          }
        }}
      />
    </Box>
  );
}
