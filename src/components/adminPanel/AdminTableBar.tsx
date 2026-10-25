import { Box, ButtonBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../../styles/theme";
import type { AdminTableOption } from "../../types/admin";

const EntityOptions: { value: AdminTableOption; label: string }[] = [
  { value: "users", label: "Users" },
  { value: "devices", label: "Devices" },
  { value: "deviceModels", label: "Device Models" },
];

interface AdminTableProps {
  selected: AdminTableOption;
  setSelectedTable: (value: AdminTableOption) => void;
  onCreateClick: () => void;
}

export function AdminTableBar({
  selected,
  setSelectedTable,
  onCreateClick,
}: AdminTableProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "6px",
        borderBottom: theme.borders.default,
      }}
    >
      {EntityOptions.map((option) => {
        const isSelected = option.value === selected;
        return (
          <ButtonBase
            key={option.value}
            onClick={() => setSelectedTable(option.value)}
            sx={{
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: theme.fontSize.xs,
              fontWeight: theme.fontWeight.bold,
              color: isSelected
                ? theme.colors.lightText
                : theme.colors.description,
              bgcolor: isSelected ? theme.surface.listItemHover : "transparent",
              border: isSelected
                ? theme.borders.listItemBorder
                : "1px solid transparent",
              "&:hover": { color: theme.colors.valueText },
              transition: "all 120ms ease",
            }}
          >
            {option.label}
          </ButtonBase>
        );
      })}

      <IconButton
        size="small"
        sx={{ marginLeft: "auto" }}
        aria-label="add"
        onClick={() => onCreateClick()}
      >
        <AddIcon sx={{ color: theme.colors.accent }} />
      </IconButton>
    </Box>
  );
}
