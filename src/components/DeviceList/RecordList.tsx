import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { RecordData } from "../../types/shared";
import { getDeviceRecords } from "../../services/deviceApi";
import { theme } from "../../styles/theme";
import { RecordDrawer } from "./RecordDrawer";
import { Map } from "../ui/Map";

type RecordListProps = {
  deviceId: string | null;
};

export function RecordList({ deviceId }: RecordListProps) {
  const [headers, setHeaders] = useState<string[]>([
    "Server.Timestamp",
    "Expires.Date",
    "Raw.Record",
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecordData | null>(null);
  const {
    data: records,
    //isLoading,
    //error,
  } = useQuery<RecordData[]>({
    queryKey: ["records", deviceId],
    queryFn: () => getDeviceRecords(deviceId!),
    enabled: deviceId != null,
    staleTime: 1000 * 60 * 2,
  });

  function handleOpenMap() {
    setOpenMap(openMap ? false : true);
  }

  function handleDrawerOpen(item: RecordData) {
    //todo: change any to type
    setSelectedItem(item);
    setOpenDrawer(true);
  }

  function parsedData(item: string) {
    try {
      const data = JSON.parse(item);
      return data;
    } catch (error) {
      console.error("Invalid JSON", error);
      return [];
    }
  }

  const handleRow = () => {
    return records?.map((item, idx) => (
      <TableRow
        key={idx}
        onClick={() => handleDrawerOpen(item)}
        sx={{
          height: 38,
          cursor: "pointer",
          borderLeft: "2px solid transparent",
          backgroundColor: theme.surface.card,
          "&:hover": {
            backgroundColor: theme.surface.cardHover,
          },
          "& td": {
            borderBottom: theme.borders.subtle,
          },
        }}
      >
        <TableCell
          sx={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.valueText,
            fontWeight: theme.fontWeight.bold,
            whiteSpace: "nowrap",
            px: 3,
          }}
        >
          {item.receivedAt}
        </TableCell>
        <TableCell
          sx={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.valueText,
            fontWeight: theme.fontWeight.bold,
            whiteSpace: "nowrap",
            px: 3,
          }}
        >
          {item.expiresAt}
        </TableCell>
        {headers.slice(2).map((header) => (
          <TableCell
            key={header}
            sx={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.valueText,
              fontWeight: theme.fontWeight.bold,
              whiteSpace: "nowrap",
              px: 3,
              height: 38,
            }}
          >
            {header === "Raw.Record"
              ? item.parsedData
              : parsedData(item.parsedData)[header]}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                    whiteSpace: "nowrap",
                    backgroundColor: theme.surface.tooltip,
                    borderBottom: theme.borders.subtle,
                    px: 3,
                    height: 38,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>{handleRow()}</TableBody>
        </Table>
      </TableContainer>

      <Map open={openMap} />
      <RecordDrawer
        headers={headers}
        handleOpenMap={handleOpenMap}
        setHeaders={setHeaders}
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
