import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import AdjustIcon from "@mui/icons-material/Adjust";
import type { MapLocation } from "../../types/device";

const locationIcon = L.divIcon({
  html: renderToStaticMarkup(
    <AdjustIcon style={{ width: 24, height: 24, fill: "teal" }} />,
  ),
  className: "",
  iconAnchor: [12, 12],
});

export type MapProps = {
  locations?: MapLocation[];
};

export function Map({ locations = [] }: MapProps) {
  return (
    <MapContainer
      center={locations[0]?.position ?? [0, 0]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={locations.map((p) => p.position)}>
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.position} icon={locationIcon}>
            <Popup>Location: {loc.position}</Popup>
          </Marker>
        ))}
      </Polyline>
    </MapContainer>
  );
}
