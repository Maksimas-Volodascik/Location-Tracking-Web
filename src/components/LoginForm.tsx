import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import Button from "./Button";
import TextField from "./TextField";
import { AuthLayout } from "./layout/AuthLayout";
import { useState } from "react";
import type { LoginProps } from "../types/shared";
import { userLogin } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  async function onSubmit(data: LoginProps) {
    const response = await userLogin(data);
    if (!response) {
      navigate("/dashboard");
    }
  }

  return (
    <AuthLayout>
      <Card
        sx={{
          background: " #111111",
          border: "2px solid #1e1e1e",
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
              src="src\assets\navIcon.png"
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
            sx={{ color: "#fd8636", fontWeight: "bold" }}
          >
            Welcome back !
          </Typography>
          <Typography
            align="center"
            sx={{ color: "#464646", fontSize: "13px", marginBottom: 4 }}
          >
            Sign in to continue to your account
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={handleOnChange}
            ></TextField>
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleOnChange}
            ></TextField>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 12, color: "#fd8636" }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button onClick={() => onSubmit(formData)}>Sign In</Button>

            <Typography
              align="center"
              sx={{ color: "#363636", fontSize: "12px", marginTop: 2 }}
            >
              Don't have an account? <a href="/register">Sign up</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
