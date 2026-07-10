import { Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../styles/theme";
import type { MenuOptions } from "../../types/shared";
import { Can } from "../Can";

type OptionMenuProps = {
  menuIsOpen: { top: number; left: number } | null;
  handleMenuClose: () => void;
  handleAction: (type: MenuOptions) => void;
};

export function OptionMenu({
  menuIsOpen,
  handleMenuClose,
  handleAction,
}: OptionMenuProps) {
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
      <Can permission="edit:devices">
        <MenuItem
          dense
          onClick={() => handleAction("edit")}
          sx={{ color: theme.colors.valueText }}
        >
          <EditIcon sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }} />
          Edit
        </MenuItem>
      </Can>
      <Can permission="delete:devices">
        <MenuItem
          dense
          onClick={() => handleAction("delete")}
          sx={{ color: theme.buttons.danger }}
        >
          <DeleteIcon
            sx={{ marginRight: "8px", fontSize: theme.fontSize.lg }}
          />
          Delete
        </MenuItem>
      </Can>
    </Menu>
  );
}
