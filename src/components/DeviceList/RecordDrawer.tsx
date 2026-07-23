import { Box, Drawer, IconButton, Typography } from "@mui/material";
import type { RecordData } from "../../types/shared";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { parseNumberOrKeepString } from "../../utils";
import { theme } from "../../styles/theme";
import type { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MapIcon from "@mui/icons-material/Map";

type RecordDrawerProps = {
  headers: string[];
  setHeaders: Dispatch<SetStateAction<string[]>>;
  handleClose: () => void;
  handleOpenMap: () => void;
  openDrawer: boolean;
  selectedItem: RecordData | null;
};

export function RecordDrawer({
  headers,
  setHeaders,
  openDrawer,
  handleClose,
  handleOpenMap,
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
        ...theme.drawer,
      }}
    >
      <Box
        sx={{
          borderBottom: theme.borders.default,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pr: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.description,
            }}
          >
            {selectedItem ? selectedItem.receivedAt : ""}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton size="small" aria-label="close" onClick={handleOpenMap}>
              <MapIcon sx={{ width: "20px" }} />
            </IconButton>
          </Box>
        </Box>
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
