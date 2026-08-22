import { Box } from "@mui/material";
import { RangePanel } from "./RangePanel";
import { EventsPanel } from "./EventsPanel";
import { SelectionPanel } from "./SelectionPanel";
import { ActionPanel } from "./ActionPanel";
import { Map } from "../../ui/Map";

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
      <Map />

      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 20% 20%" }}>
        <RangePanel />
        <EventsPanel />
        <SelectionPanel />
        <ActionPanel />
      </Box>
    </Box>
  );
}
