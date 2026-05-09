import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import Button from "./Button";
import TextField from "./TextField";

export function LoginForm() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        mr: "10%",
      }}
    >
      <Card
        sx={{
          border: "1px solid #0a0a0a",
          backgroundColor: "#121212",
          width: "350px",
          height: "500px",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "#ff7d13", marginBottom: 3, fontWeight: "bold" }}
          >
            Welcome back !
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField label="Email" type="email"></TextField>
            <TextField label="Password" type="password"></TextField>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 12, color: "#ff7d13" }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button>Sign In</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
