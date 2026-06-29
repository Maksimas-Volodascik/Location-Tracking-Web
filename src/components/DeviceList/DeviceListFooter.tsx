import { Box, IconButton, InputBase } from "@mui/material";
import { theme } from "../../styles/theme";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeviceModal from "./DeviceModal";

export default function DeviceListFooter() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        background: theme.bg.card,
        display: "flex",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#cecece",
          border: `1px solid ${focused ? "#5b8dee" : "#2e2e2e"}`,
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
          sx={{ fontSize: 15, color: focused ? "#5b8dee" : "#888888" }}
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
            color: "#ffffff",
            fontSize: "0.8rem",
            "& input": {
              padding: "4px 0",
              "&::placeholder": { color: "#888888", opacity: 1 },
            },
          }}
        />
      </Box>
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
      <DeviceModal open={open} setIsOpen={setOpen} />
    </Box>
  );
}
