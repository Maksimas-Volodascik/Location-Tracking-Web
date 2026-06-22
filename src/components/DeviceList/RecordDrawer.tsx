import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import type { RecordData } from "../../types/shared";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { parseNumberOrKeepString } from "../../utils";
import { theme } from "../../styles/theme";
import type { Dispatch, SetStateAction } from "react";

type RecordDrawerProps = {
  headers: string[];
  setHeaders: Dispatch<SetStateAction<string[]>>;
  handleClose: () => void;
  openDrawer: boolean;
  selectedItem: RecordData | null;
};

export default function RecordDrawer({
  headers,
  setHeaders,
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

  function handleAdd(key: string) {
    const original = headers.slice(0, -1);
    const lastItem = headers[headers.length - 1];
    setHeaders([...original, key, lastItem]);
  }

  function handleRemove(key: string) {
    setHeaders(headers.filter((header) => header !== key));
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

          {headers.includes(key) ? (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleRemove(key)}
            >
              <RemoveCircleIcon sx={{ color: theme.buttons.danger }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleAdd(key)}
            >
              <AddCircleIcon sx={{ color: theme.buttons.success }} />
            </IconButton>
          )}
        </Box>
      ))}
    </Drawer>
  );
}
