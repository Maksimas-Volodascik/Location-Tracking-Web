import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import type { RecordData } from "../../types/shared";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { parseNumberOrKeepString } from "../../utils";
import { theme } from "../../styles/theme";

type RecordDrawerProps = {
  handleClose: () => void;
  openDrawer: boolean;
  selectedItem: RecordData | null;
};

export default function RecordDrawer({
  openDrawer,
  handleClose,
  selectedItem,
}: RecordDrawerProps) {
  const parsedData = (() => {
    if (!selectedItem) return [];

    try {
      const data = JSON.parse(selectedItem.parsedData);
      return data;
    } catch (error) {
      console.error("Invalid JSON", error);
      return [];
    }
  })();

  function formatValue(v: unknown): string {
    const value = parseNumberOrKeepString(v);
    return typeof value === "number" ? `ID.${value}` : String(value);
  }

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={openDrawer}
      sx={{
        width: openDrawer ? "320px" : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: theme.bg.drawer,
          borderLeft: theme.borders.default,
          width: "320px",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: theme.borders.default,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            minWidth: 0,
            width: 32,
            height: 32,
            borderRadius: "4px",
            color: theme.colors.valueText,
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.bold,
          }}
          onClick={handleClose}
        >
          X
        </Button>
        <Typography
          sx={{ fontSize: theme.fontSize.xs, color: theme.colors.description }}
        >
          {selectedItem ? selectedItem.receivedAt : ""}
        </Typography>
      </Box>

      {Object.entries(parsedData).map(([key, value], idx) => (
        <Box
          key={idx}
          sx={{
            borderBottom: theme.borders.default,
            width: "100%",
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: theme.fontSize.base,
                color: theme.colors.valueText,
              }}
            >
              {formatValue(key)}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.description,
              }}
            >
              {String(value)}
            </Typography>
          </Box>

          <IconButton aria-label="delete" size="small">
            <AddCircleIcon sx={{ color: theme.buttons.success }} />
          </IconButton>
        </Box>
      ))}
    </Drawer>
  );
}
