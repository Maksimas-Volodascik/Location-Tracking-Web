import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { RegisterProps } from "../types/shared";
import { userRegister } from "../services/authProvider";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";
import navIcon from "../assets/navIcon.png";
import { Background } from "../components/ui/Background";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";

export function RegisterPage() {
  const [formData, setFormData] = useState<RegisterProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const navigate = useNavigate();

  async function onSubmit(data: RegisterProps) {
    const response = await userRegister(data);
    if (response == null) {
      navigate("/login");
    }
    console.log(response);
  }
  return (
    <>
      <Background />
      <AuthLayout>
        <Card
          sx={{
            background: theme.surface.page,
            border: theme.borders.primary,
            width: "350px",
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
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                }}
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
              Sign up and get started for free
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
                ></TextField>
                <TextField
                  name="lastName"
                  label="Last name"
                  type="text"
                  onChange={handleChange}
                ></TextField>
              </Box>

              <TextField
                name="email"
                label="Email"
                type="email"
                onChange={handleChange}
              ></TextField>

              <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
              ></TextField>
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
                onChange={handleChange}
              ></TextField>

              <Button onClick={() => onSubmit(formData)}>Create account</Button>

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
    </>
  );
}
