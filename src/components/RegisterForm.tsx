import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import Button from "./Button";
import TextField from "./TextField";
import { AuthLayout } from "./layout/AuthLayout";

export function RegisterForm() {
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
              <TextField label="First name" type="text"></TextField>
              <TextField label="Last name" type="text"></TextField>
            </Box>

            <TextField label="Email" type="email"></TextField>

            <TextField label="Password" type="password"></TextField>
            <Typography
              sx={{ color: "#363636", fontSize: "12px", marginTop: "-10px" }}
            >
              Min. 8 characters, mix of letters & numbers
            </Typography>

            <TextField label="Confirm password" type="password"></TextField>

            <Button>Create account</Button>

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
