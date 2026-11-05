import { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  alpha,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import WorkspacesIcon from "@mui/icons-material/Business";
import type { UpdateWorkspaceData, WorkspaceData } from "../../types/workspace";
import { theme } from "../../styles/theme";
import { useWorkspaceForm } from "../../hooks/useWorkspaceForm";
import { ModalLayout } from "../layout/ModalLayout";

interface WorkspaceModalProps {
  open: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit: (form: UpdateWorkspaceData) => void;
  initialData?: WorkspaceData | null;
}

export function WorkspaceModal({
  open,
  setIsOpen,
  onSubmit,
  initialData,
}: WorkspaceModalProps) {
  const { form, handleChange, handleClear, resetForm } = useWorkspaceForm({
    initialData,
  });

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open, resetForm]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    onSubmit(form);
    handleClose();
  };

  return (
    <ModalLayout onClose={handleClose} open={open}>
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: theme.borders.default,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "9px",
            bgcolor: alpha(theme.colors.accent, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WorkspacesIcon
            sx={{ color: theme.colors.accent, fontSize: theme.fontSize.xl }}
          />
        </Box>
        <Box>
          <Typography
            id="workspace-modal-title"
            sx={{
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.valueText,
              lineHeight: 1.2,
            }}
          >
            Edit Workspace
          </Typography>
          <Typography
            sx={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.description,
              mt: 0.2,
            }}
          >
            Update the details for this workspace
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              width: 140,
              fontSize: theme.fontSize.sm,
              color: theme.colors.label,
              flexShrink: 0,
            }}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. Northern Fleet"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={{ "& input": { fontSize: theme.fontSize.sm } }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Typography
            sx={{
              width: 140,
              fontSize: theme.fontSize.sm,
              color: theme.colors.label,
              flexShrink: 0,
              pt: 1,
            }}
          >
            Description
          </Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={3}
            placeholder="What is this workspace used for?"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            sx={{ "& textarea": { fontSize: theme.fontSize.sm } }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: theme.borders.default }} />
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClear}
          sx={{
            border: theme.borders.default,
            color: theme.colors.label,
            borderRadius: "9px",
            textTransform: "none",

            "&:hover": {
              borderColor: theme.buttons.primary,
              color: theme.buttons.primary,
              backgroundColor: theme.buttons.secondaryHover,
            },
          }}
        >
          Clear
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            bgcolor: theme.buttons.primary,
            color: theme.colors.lightText,
            borderRadius: "9px",
            px: 2.5,
            "&:hover": { bgcolor: theme.buttons.primaryHover },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </ModalLayout>
  );
}
