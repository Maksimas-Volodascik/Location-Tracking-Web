import { Box } from "@mui/material";
import { RangePanel } from "./RangePanel";
import { EventsPanel } from "./EventsPanel";
import { SelectionPanel } from "./SelectionPanel";
import { ActionPanel } from "./ActionPanel";
import { Map } from "../../ui/Map";
import { useQuery } from "@tanstack/react-query";
import type { MapLocation, DevicePositionData } from "../../../types/device";
import { getDevicePositions } from "../../../services/deviceApi";

type DeviceMapProps = {
  open: boolean;
  deviceId: string | undefined;
};

export function DeviceMap({ open, deviceId }: DeviceMapProps) {
  const { data: positions } = useQuery<DevicePositionData[] | null>({
    queryKey: ["positions", deviceId],
    queryFn: () => getDevicePositions(deviceId!),
    staleTime: 1000 * 60 * 2,
  });

  if (!open) {
    return null;
  }

  const mapLocations: MapLocation[] = (positions ?? []).map((p) => ({
    id: p.id,
    position: [p.longitude, p.latitude],
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "65% 35%",
      }}
    >
      <Map locations={mapLocations} />

      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 20% 20%" }}>
        <RangePanel />
        <EventsPanel />
        <SelectionPanel />
        <ActionPanel />
      </Box>
    </Box>
  );
}
