import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { InviteRegisterProps } from "../types/auth";
import { theme } from "../styles/theme";
import navIcon from "../assets/navIcon.png";
import { Background } from "../components/ui/Background";
import { AuthLayout } from "../components/layout/AuthLayout";
import { ModalLayout } from "../components/layout/ModalLayout";
import { Button } from "../components/ui/Button";
import {
  userInviteRegistration,
  validateInviteToken,
} from "../services/authApi";

export function InviteRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tokenInput, setTokenInput] = useState(
    () => searchParams.get("token") ?? "",
  );
  const [tokenError, setTokenError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);

  const [formData, setFormData] = useState<InviteRegisterProps>({
    token: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function handleCheckToken() {
    const token = tokenInput.trim();
    try {
      await validateInviteToken(token);
      setFormData((prev) => ({ ...prev, token }));
      setIsTokenValid(true);
      setTokenError("");
    } catch {
      setTokenError("Invalid or expired invitation code");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  function onSubmit(data: InviteRegisterProps) {
    try {
      userInviteRegistration(data);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register");
    }
  }

  return (
    <>
      <Background />
      <ModalLayout open={!isTokenValid} onClose={() => {}}>
        <Box sx={{ padding: "24px" }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: theme.colors.accent,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            Join workspace
          </Typography>
          <Typography
            align="center"
            sx={{
              color: theme.colors.faintDescription,
              fontSize: theme.fontSize.sm,
              marginBottom: 3,
            }}
          >
            Enter the invitation code you received
          </Typography>

          <TextField
            fullWidth
            label="Invitation code"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            error={tokenError !== ""}
            helperText={tokenError}
          />

          <Button onClick={handleCheckToken}>Continue</Button>

          <Typography
            align="center"
            sx={{
              color: theme.colors.faintDescription,
              fontSize: theme.fontSize.xs,
              marginTop: 2,
            }}
          >
            Already have an account? <a href="/login">Sign in</a>
          </Typography>
        </Box>
      </ModalLayout>

      {isTokenValid && (
        <AuthLayout>
          <Card
            sx={{
              background: theme.surface.page,
              border: theme.borders.primary,
              width: "400px",
            }}
          >
            <CardContent>
              <Box // Icon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                  marginTop: "5px",
                }}
              >
                <Box
                  component="img"
                  src={navIcon}
                  sx={{ width: "40px", height: "40px" }}
                />
              </Box>

              <Typography // Title
                variant="h5"
                align="center"
                sx={{
                  color: theme.colors.accent,
                  fontWeight: theme.fontWeight.bold,
                }}
              >
                Create account
              </Typography>
              <Typography
                align="center"
                sx={{
                  color: theme.colors.faintDescription,
                  fontSize: theme.fontSize.sm,
                  marginBottom: 4,
                }}
              >
                You've been invited to join a workspace
              </Typography>

              <Box //Fields
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <TextField
                    name="firstName"
                    label="First name"
                    type="text"
                    onChange={handleChange}
                  />
                  <TextField
                    name="lastName"
                    label="Last name"
                    type="text"
                    onChange={handleChange}
                  />
                </Box>

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleChange}
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                />
                <Typography
                  sx={{
                    color: theme.colors.faintDescription,
                    fontSize: theme.fontSize.xs,
                    marginTop: "-10px",
                  }}
                >
                  Min. 8 characters, mix of letters & numbers
                </Typography>

                <TextField
                  name="confPassword"
                  label="Confirm password"
                  type="password"
                />

                <Button onClick={() => onSubmit(formData)}>
                  Create account
                </Button>

                <Typography
                  align="center"
                  sx={{
                    color: theme.colors.faintDescription,
                    fontSize: theme.fontSize.xs,
                    marginTop: 2,
                  }}
                >
                  Already have an account? <a href="/login">Sign in</a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </AuthLayout>
      )}
    </>
  );
}
