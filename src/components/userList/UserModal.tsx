import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
  alpha,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import type { UserData, UserForm } from "../../types/users";
import { getAvailableUserRoles, type Role } from "../../types/permissions";
import { theme } from "../../styles/theme";
import { useUserForm } from "../../hooks/useUserForm";
import { ModalLayout } from "../layout/ModalLayout";
import { useAuth } from "../../contexts/AuthContext";
import { userInvite } from "../../services/authApi";
import { capitalizeFirstLetter } from "../../utils";

interface UserModalProps {
  open: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit: (form: UserForm, userGuid: string | null) => void;
  initialData?: UserData | null;
}

const labelSx = {
  width: 140,
  fontSize: theme.fontSize.sm,
  color: theme.colors.label,
  flexShrink: 0,
};

export function UserModal({
  open,
  setIsOpen,
  onSubmit,
  initialData,
}: UserModalProps) {
  const isEditMode = !!initialData;
  const { role: currentRole } = useAuth();
  const { form, handleChange, handleClear } = useUserForm({
    initialData,
  });

  // invite mode state
  const [role, setRole] = useState<Role>("user");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    if (open) {
      handleClear();
      setRole("user");
      setInviteCode("");
    }
  }, [open, handleClear]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    onSubmit(form, initialData ? initialData.userGuid : null);
    handleClose();
  };

  async function handleInvite() {
    const response = await userInvite(role);
    setInviteCode(response.token);
  }

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
            {isEditMode ? "Edit User" : "Invite"}
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
              : "Pick a role and generate an invite code"}
          </Typography>
        </Box>
      </Box>

      {isEditMode ? (
        <>
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
              <Typography sx={labelSx}>First Name</Typography>
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
              <Typography sx={labelSx}>Last Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
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
        </>
      ) : (
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
            <Typography sx={labelSx}>Role</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              sx={{ "& .MuiSelect-select": { fontSize: theme.fontSize.sm } }}
            >
              {getAvailableUserRoles(currentRole).map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={handleInvite}
              sx={{
                bgcolor: theme.buttons.primary,
                color: theme.colors.lightText,
                borderRadius: "9px",
                px: 2.5,
                flexShrink: 0,
                "&:hover": { bgcolor: theme.buttons.primaryHover },
              }}
            >
              Invite
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={labelSx}>Invite Code</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Press Invite to generate"
              value={inviteCode}
              slotProps={{ input: { readOnly: true } }}
              sx={{ "& input": { fontSize: theme.fontSize.sm } }}
            />
          </Box>
        </Box>
      )}
    </ModalLayout>
  );
}
