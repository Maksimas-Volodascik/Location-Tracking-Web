import { Box, Card, CardContent, Typography } from "@mui/material";
import Button from "./Button";
import TextField from "./TextField";
import { AuthLayout } from "./layout/AuthLayout";
import { useState } from "react";
import type { RegisterProps } from "../types/shared";
import { userRegister } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
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
            Create account
          </Typography>
          <Typography
            align="center"
            sx={{ color: "#464646", fontSize: "13px", marginBottom: 4 }}
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
              sx={{ color: "#363636", fontSize: "12px", marginTop: "-10px" }}
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
              sx={{ color: "#363636", fontSize: "12px", marginTop: 2 }}
            >
              Already have an account? <a href="/register">Sign in</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
