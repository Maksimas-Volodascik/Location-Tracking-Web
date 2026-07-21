import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { RecordData } from "../../types/shared";
import { getDeviceRecords } from "../../services/deviceApi";
import { theme } from "../../styles/theme";
import { RecordDrawer } from "./RecordDrawer";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Draggable from "react-draggable";
import { type LatLngTuple } from "leaflet";

type RecordListProps = {
  deviceId: string | null;
};

export function RecordList({ deviceId }: RecordListProps) {
  const [headers, setHeaders] = useState<string[]>([
    "Server.Timestamp",
    "Expires.Date",
    "Raw.Record",
  ]);

  const position: LatLngTuple = [54.6872, 25.2797];
  const nodeRef = useRef(null);

  const [openDrawer, setOpenDrawer] = useState(false);
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

      <RecordDrawer
        headers={headers}
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
      <Draggable handle=".window-title" nodeRef={nodeRef}>
        <Paper
          ref={nodeRef}
          elevation={8}
          sx={{
            position: "fixed",
            top: 100,
            left: 100,
            width: 300,
            zIndex: 1300,
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <Box
            className="window-title"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1.5,
              py: 0.5,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              cursor: "move",
            }}
          >
            <Typography variant="subtitle2">My Folder</Typography>
          </Box>
          <Box>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: 250, width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Paper>
      </Draggable>
    </Box>
  );
}
