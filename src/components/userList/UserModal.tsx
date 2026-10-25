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
import PersonIcon from "@mui/icons-material/Person";
import type { UserData, UserForm } from "../../types/users";
import { theme } from "../../styles/theme";
import { useUserForm } from "../../hooks/useUserForm";
import { ModalLayout } from "../layout/ModalLayout";

interface UserModalProps {
  open: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit: (form: UserForm, userGuid: string | null) => void;
  initialData?: UserData | null;
}

export function UserModal({
  open,
  setIsOpen,
  onSubmit,
  initialData,
}: UserModalProps) {
  const isEditMode = !!initialData;
  const { form, handleChange, handleClear } = useUserForm({
    initialData,
  });

  useEffect(() => {
    if (open) {
      handleClear();
    }
  }, [open, handleClear]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    onSubmit(form, initialData ? initialData.userGuid : null);
    handleClose();
  };

  return (
    <ModalLayout onClose={() => setIsOpen(false)} open={open}>
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
            placeholder="John"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
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
            placeholder="Doe"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            sx={{ "& input": { fontSize: theme.fontSize.sm } }}
          />
        </Box>

        {!isEditMode && (
          <>
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
                placeholder="john.doe@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
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
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                sx={{ "& input": { fontSize: theme.fontSize.sm } }}
              />
            </Box>
          </>
        )}
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
          {isEditMode ? "Save Changes" : "Add User"}
        </Button>
      </Box>
    </ModalLayout>
  );
}
