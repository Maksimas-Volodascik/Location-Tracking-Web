import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

export function Map() {
  const position: LatLngTuple = [54.7068368, 25.2388263];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Location: {position}</Popup>
      </Marker>
    </MapContainer>
  );
}
