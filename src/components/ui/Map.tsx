import { Box, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import Draggable from "react-draggable";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

type MapProps = {
  open: boolean;
};

export function Map({ open }: MapProps) {
  if (!open) {
    return null;
  }

  const position: LatLngTuple = [54.6872, 25.2797];
  const nodeRef = useRef(null);

  return (
    <Draggable handle=".window-title" nodeRef={nodeRef}>
      <Paper
        ref={nodeRef}
        elevation={8}
        sx={{
          position: "fixed",
          top: 100,
          left: 100,
          width: 600,
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
  );
}
