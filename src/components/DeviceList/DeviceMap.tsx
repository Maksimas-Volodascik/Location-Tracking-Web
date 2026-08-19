import { Box, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { EventsPanel } from "./graph/EventsPanel";
import { RangePanel } from "./graph/RangePanel";

type DeviceMapProps = {
  open: boolean;
};

export function DeviceMap({ open }: DeviceMapProps) {
  if (!open) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "65% 35%",
      }}
    >
      <MapContainer
        center={[54.6872, 25.2797]}
        zoom={13}
        scrollWheelZoom={false}
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

      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 20% 20%" }}>
        <RangePanel />
        <EventsPanel />
        <Typography>Range</Typography>
        <Typography>Range</Typography>
      </Box>
    </Box>
  );
}
