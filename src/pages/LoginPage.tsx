import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="src\assets\background.png"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
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
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    //main text
                    color: "#ff7d13",
                  },
                  "& .MuiInputLabel-root": {
                    //label
                    color: "#ff7d13",
                  },

                  "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "#ff7d13",
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#ff7d13",
                  },
                  "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "#ff7d13",
                  },
                  backgroundColor: "#212121",
                }}
              />

              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                color="warning"
                sx={{
                  "& .MuiInputBase-input": {
                    //main text
                    color: "#ff7d13",
                  },
                  "& .MuiInputLabel-root": {
                    //label
                    color: "#ff7d13",
                  },
                  "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "#ff7d13",
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#ff7d13",
                  },
                  "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "#ff7d13",
                  },
                  backgroundColor: "#212121",
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ fontSize: 12, color: "#ff7d13" }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 1,
                  backgroundColor: "#ff7d13",
                  color: "#000",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#db6a00",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
