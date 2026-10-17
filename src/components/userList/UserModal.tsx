import { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  alpha,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import type { RegisterProps } from "../../types/auth";
import { theme } from "../../styles/theme";

interface UserModalProps {
  open: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit: (form: RegisterProps, userGuid: string | null) => void;
  initialData?: RegisterProps | null;
}

export function UserModal({
  open,
  setIsOpen,
  onSubmit,
  initialData,
}: UserModalProps) {
  const isEditMode = !!initialData;

  useEffect(() => {
    if (open) {
      //handleClear();
    }
  }, [open]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    //onSubmit(form, initialData ? initialData.guid : null);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-modal-title"
      slotProps={{
        backdrop: {
          sx: { ...theme.modalBlur },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", sm: "480px" },
          bgcolor: theme.surface.card,
          border: theme.borders.default,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
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
            <PersonIcon
              sx={{ color: theme.colors.accent, fontSize: theme.fontSize.xl }}
            />
          </Box>
          <Box>
            <Typography
              id="user-modal-title"
              sx={{
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.valueText,
                lineHeight: 1.2,
              }}
            >
              {isEditMode ? "Edit User" : "Add User"}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.description,
                mt: 0.2,
              }}
            >
              {isEditMode
                ? "Update the details for this user"
                : "Fill in the details below to register a new user"}
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
              First Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. John"
              value={"placeholder"}
              //onChange={(e) => handleChange("firstName", e.target.value)}
              sx={{ "& input": { fontSize: theme.fontSize.sm } }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                width: 140,
                fontSize: theme.fontSize.sm,
                color: theme.colors.label,
                flexShrink: 0,
              }}
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Doe"
              value={"placeholder"}
              //onChange={(e) => handleChange("lastName", e.target.value)}
              sx={{ "& input": { fontSize: theme.fontSize.sm } }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                width: 140,
                fontSize: theme.fontSize.sm,
                color: theme.colors.label,
                flexShrink: 0,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="email"
              placeholder="e.g. john.doe@example.com"
              value={"placeholder"}
              //onChange={(e) => handleChange("email", e.target.value)}
              sx={{ "& input": { fontSize: theme.fontSize.sm } }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                width: 140,
                fontSize: theme.fontSize.sm,
                color: theme.colors.label,
                flexShrink: 0,
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="password"
              autoComplete="new-password"
              placeholder={
                isEditMode ? "Leave blank to keep current" : "e.g. ••••••••"
              }
              value={"placeholder"}
              //onChange={(e) => handleChange("password", e.target.value)}
              sx={{ "& input": { fontSize: theme.fontSize.sm } }}
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
            //onClick={handleClear}
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
            {isEditMode ? "Save Changes" : "Add User"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
