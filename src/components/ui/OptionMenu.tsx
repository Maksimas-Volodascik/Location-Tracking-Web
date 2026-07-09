import { Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../styles/theme";

type OptionMenuProps = {
  menuIsOpen: { top: number; left: number } | null;
  handleMenuClose: () => void;
};

export function OptionMenu({ menuIsOpen, handleMenuClose }: OptionMenuProps) {
  const handleAction = (type: "view" | "edit" | "delete") => {
    console.log("pressed " + type);
    handleMenuClose();
  };
  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={menuIsOpen ?? undefined}
      open={menuIsOpen !== null}
      onClose={handleMenuClose}
      slotProps={{
        paper: { sx: { backgroundColor: theme.surface.tooltip } },
      }}
    >
      <MenuItem
        dense
        onClick={() => handleAction("view")}
        sx={{ color: theme.colors.valueText }}
      >
        <VisibilityIcon
          sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
        />
        View
      </MenuItem>
      <MenuItem
        dense
        onClick={() => handleAction("edit")}
        sx={{ color: theme.colors.valueText }}
      >
        <EditIcon sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }} />
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => handleAction("delete")}
        sx={{ color: theme.buttons.danger }}
      >
        <DeleteIcon sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }} />
        Delete
      </MenuItem>
    </Menu>
  );
}
