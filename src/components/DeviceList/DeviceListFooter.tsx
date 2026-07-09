import { Box, IconButton, InputBase } from "@mui/material";
import { theme } from "../../styles/theme";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Can } from "../Can";
import { DeviceModal } from "./DeviceModal";
import { createNewDevice } from "../../services/deviceApi";
import { useQueryClient } from "@tanstack/react-query";
import type { DeviceForm } from "../../types/shared";

export function DeviceListFooter() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCreate = async (form: DeviceForm) => {
    console.log(form);
    await createNewDevice(form);
    queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  return (
    <Box
      sx={{
        background: theme.surface.card,
        display: "flex",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: theme.surface.listItem,
          border: `1px solid ${focused ? theme.colors.accent : theme.colors.faintDescription}`,
          borderRadius: "12px",
          px: 1,
          margin: "10px",
          gap: 1,
          width: "90%",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <SearchIcon
          sx={{
            fontSize: theme.fontSize.base,
            color: focused ? theme.colors.accent : theme.colors.description,
          }}
        />
        <InputBase
          fullWidth
          placeholder="Search IMEI…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          sx={{
            height: "40px",
            color: theme.colors.contrastText,
            fontSize: theme.fontSize.sm,
            "& input": {
              padding: "4px 0",
              "&::placeholder": { color: theme.colors.description, opacity: 1 },
            },
          }}
        />
      </Box>
      <Can permission="create:objects">
        <Box sx={{ display: "flex", justifyContent: "center", width: "10%" }}>
          <IconButton
            sx={{
              position: "absolute",
              transform: "translateY(-35%)",
            }}
            aria-label="delete"
            onClick={() => setOpen(true)}
          >
            <AddCircleIcon
              sx={{
                color: theme.buttons.success,
                width: "60px",
                height: "60px",
              }}
            />
          </IconButton>
        </Box>
      </Can>
      <DeviceModal open={open} setIsOpen={setOpen} onSubmit={handleCreate} />
    </Box>
  );
}
